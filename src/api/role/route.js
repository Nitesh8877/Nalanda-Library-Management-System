const express = require('express');
const { addRole, getRole, updateRole, deleteRole}=require('./controller');
const roleRouter = express.Router();

module.exports = roleRouter;

roleRouter.route('/').post(addRole).get(getRole),
roleRouter.route('/:id').put(updateRole).delete(deleteRole)