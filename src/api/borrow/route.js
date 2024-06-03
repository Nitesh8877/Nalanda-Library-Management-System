const express = require('express');
const {borrowBook,returnBook,getBorrowHistory,mostBorrowedBooks,mostActiveMembers,bookAvailability}=require('./controller');
const roleCheck = require('../../middleware/roleCheck');
const borrowRouter = express.Router();

module.exports = borrowRouter;

borrowRouter.route('/').post(roleCheck,borrowBook).get(getBorrowHistory);
borrowRouter.route("/most-borrow-books").get(roleCheck,mostBorrowedBooks)
borrowRouter.route("/most-active-members").get(roleCheck,mostActiveMembers)
borrowRouter.route("/books-available").get(bookAvailability)
borrowRouter.route('/:id').put(returnBook);