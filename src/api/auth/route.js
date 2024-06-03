const express = require('express');
const { singin } = require('./controller');
const authRouter = express.Router();

module.exports = authRouter;

authRouter.route('/').post(singin);