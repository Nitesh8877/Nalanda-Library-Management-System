const Book = require('./model');
const Borrow = require('./model');

module.exports = {
    createBorrowDB:(data)=>Borrow.create(data),
    updateBorrowDB:(filter, data)=>Borrow.findOneAndUpdate(filter, data, {new:true}),
    getBorrowHistoryDB: (memberId) => Borrow.find({ memberId }).populate('bookId'),
    mostBorrowedBooksDB: () => Book.find().sort({ borrowedCount: -1 }).limit(10),
    mostActiveMembersDB: () => Borrow.aggregate([
        { $group: { _id: "$memberId", borrowCount: { $sum: 1 } } },
        { $sort: { borrowCount: -1 } },
        { $limit: 10 }
    ]),
    bookAvailabilityDB: () => Book.aggregate([
        {
            $group: {
                _id: null,
                totalBooks: { $sum: "$numberOfCopies" },
                borrowedBooks: { $sum: "$borrowedCount" },
                availableBooks: { $sum: { $subtract: ["$numberOfCopies", "$borrowedCount"] } }
            }
        },
        {
            $project: {
                _id: 0,
                totalBooks: 1,
                borrowedBooks: 1,
                availableBooks: {
                    $subtract: ["$totalBooks", "$borrowedBooks"]
                }
            }
        }
    ])
};
