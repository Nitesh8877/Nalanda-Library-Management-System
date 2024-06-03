const express = require('express');
const authRouter = require('../api/auth/route');
const UserRouter = require('../api/user/route');
const Router = express.Router();

// Mounting authRouter and UserRouter
Router.use('/login', authRouter);
Router.use('/register', UserRouter);

module.exports = Router;
