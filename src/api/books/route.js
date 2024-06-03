const express = require('express');
const {addBook,updateBook,deleteBook,getBook,listBooks}=require('./controller');
const roleCheck = require('../../middleware/roleCheck');
const bookRouter = express.Router();

module.exports = bookRouter;

bookRouter.route('/').post(roleCheck ,addBook).get(listBooks),
bookRouter.route('/:id').put(roleCheck,updateBook).delete(roleCheck,deleteBook).get(roleCheck,getBook)