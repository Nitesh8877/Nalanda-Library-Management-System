const express = require('express');
const {signup}=require('./controller')
const UserRouter = express.Router();

module.exports = UserRouter;

UserRouter.route('/').post(signup)