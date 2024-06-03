const Book = require('./model');

module.exports = {
    addBookDB: (data) => Book.create(data),
    updateBookDB: (filter, data) => Book.findOneAndUpdate(filter, data, { new: true }),
    deleteBookDB: (filter) => Book.findOneAndDelete(filter),
    getBookDB: (filter) => Book.findOne(filter),
     listBooksDB: (filter, skip, limit, sort) => {
            return Book.aggregate([
                {
                    $match: filter
                },
                {
                    $lookup: {
                        from: "users",
                        let: { id: "$createdBy" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$id"]
                                    }
                                }
                            }
                        ],
                        as: "createdBy"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        let: { id: "$updatedBy" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$id"]
                                    }
                                }
                            }
                        ],
                        as: "updatedBy"
                    }
                },
                {
                    $unwind: {
                        path: "$createdBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: "$updatedBy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],
                        data: [
                            { $skip: skip },
                            { $limit: limit },
                            { $sort: sort }
                        ]
                    }
                },
                {
                    $unwind: {
                        path: "$metadata",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        data: 1,
                        total: { $ifNull: ["$metadata.total", 0] }
                    }
                }
            ]);
        }
    
};
