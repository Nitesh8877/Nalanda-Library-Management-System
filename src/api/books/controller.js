const { badReq, iserror, rm, noContent } = require("../../utils/common");
const { responseMessage, responseCode } = require("../../utils/constant");
const { getBookDB, addBookDB, updateBookDB, deleteBookDB, listBooksDB } = require("./query");

module.exports = {
    addBook: async (req, res) => {
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        try {
            let book = await getBookDB({ ISBN });
            if (book) {
                return badReq(res, responseMessage.BOOK_ALREADY_EXIST);
            }
            let created = await addBookDB({ title, author, ISBN, publicationDate, genre, numberOfCopies,createdBy:req.authUser?._id });
            if (created) {
                return rm(res, responseCode.CREATED, responseMessage.ADD_BOOK);
            }
            return badReq(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author, ISBN, publicationDate, genre, numberOfCopies } = req.body;
        try {
            let book = await getBookDB({ _id: id });
            if (book?.ISBN !== ISBN) {
                let existingBook = await getBookDB({ ISBN });
                if (existingBook) {
                    return badReq(res, responseMessage.BOOK_ALREADY_EXIST);
                }
            }
            let updated = await updateBookDB({ _id: id }, { title, author, ISBN, publicationDate, genre, numberOfCopies, updatedBy:req.authUser?._id });
            if (updated) {
                return rm(res, responseCode.OK, responseMessage.UPDATE_BOOK);
            }
            return badReq(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    getBook: async (req, res) => {
        const { id } = req.params;
        try {
            let book = await getBookDB({ _id: id });
            if (book) {
                return rm(res, responseCode.OK, responseMessage.GET_BOOK, book);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    deleteBook: async (req, res) => {
        const { id } = req.params;
        try {
            let deletedBook = await deleteBookDB({ _id: id });
            if (deletedBook) {
                return rm(res, responseCode.OK, responseMessage.DELETE_BOOK);
            }
            return badReq(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
     listBooks: async (req, res) => {
        let { page = 1, limit = 10, genre, author } = req.query;
        let filter = {};
        if (genre) filter.genre = { $regex: genre, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };
         let skip= (page - 1) * limit;
            limit= parseInt(limit);
           let sort= { createdAt: -1 }; 
        

        try {
            let books = await listBooksDB(filter, skip,limit,sort);
            if (books.length > 0) {
                return rm(res, responseCode.OK, responseMessage.LIST_BOOKS, books[0]);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    }
};
