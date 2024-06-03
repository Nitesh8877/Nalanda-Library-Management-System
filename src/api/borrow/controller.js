const { badReq, iserror, rm, noContent } = require("../../utils/common");
const { responseMessage, responseCode } = require("../../utils/constant");
const { getBookDB, updateBookDB } = require("../books/query");
const {
    borrowBookDB, returnBookDB, getBorrowHistoryDB, mostBorrowedBooksDB,
    mostActiveMembersDB, bookAvailabilityDB,
    createBorrow,
    createBorrowDB,
    updateBorrowDB
} = require("./query");

module.exports = {
    borrowBook: async (req, res) => {
        const { memberId, bookId } = req.body;
        try {
            const book = await getBookDB({_id:bookId});
            if (book && book.numberOfCopies > 0) {
               let updated= await updateBookDB({_id:bookId}, { $inc: { numberOfCopies: -1, borrowedCount: 1 } });
               if(updated)
                { 
                  let borrow=  await  createBorrowDB({ memberId, bookId });
                    if (borrow) {
                        return rm(res, responseCode.CREATED, responseMessage.BORROW_BOOK, borrow);
                    }
                }
            }
            return badReq(res, 'Book not available');  
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    returnBook: async (req, res) => {
        const { memberId, bookId } = req.body;
        try {
            const borrow = await updateBorrowDB({ memberId, bookId }, { returnDate: new Date() });
            if (borrow) {
                await updateBookDB({_id:bookId}, { $inc: { numberOfCopies: 1 } });
                return rm(res, responseCode.OK, responseMessage.RETURN_BOOK, borrow);
            }
            return badReq(res,'Borrow record not found'); 
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    getBorrowHistory: async (req, res) => {
        const { memberId } = req.params;
        try {
            let history = await getBorrowHistoryDB(memberId);
            if (history) {
                return rm(res, responseCode.OK, responseMessage.BORROW_HISTORY, history);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    mostBorrowedBooks: async (req, res) => {
        try {
            let books = await mostBorrowedBooksDB();
            if (books) {
                return rm(res, responseCode.OK, responseMessage.MOST_BORROWED_BOOKS, books);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    mostActiveMembers: async (req, res) => {
        try {
            let members = await mostActiveMembersDB();
            if (members) {
                return rm(res, responseCode.OK, responseMessage.MOST_ACTIVE_MEMBERS, members);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    },
    bookAvailability: async (req, res) => {
        try {
            let availability = await bookAvailabilityDB();
            if (availability) {
                return rm(res, responseCode.OK, responseMessage.BOOK_AVAILABILITY, availability);
            }
            return noContent(res);
        } catch (error) {
            console.log(error, "something went wrong");
            return iserror(res);
        }
    }
};
