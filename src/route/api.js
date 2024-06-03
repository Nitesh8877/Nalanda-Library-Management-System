const express = require('express');
const bookRouter = require('../api/books/route');
const borrowRouter = require('../api/borrow/route');
const roleRouter = require('../api/role/route');
const Router = express.Router();

module.exports = Router;

Router.use("/book",bookRouter);
Router.use("/borrow",borrowRouter);
Router.use('/role',roleRouter)