const Role=require('./model')

module.exports={
    addRoleDB:(data)=>Role.create(data),
    updateRoleDB:(filter, data)=>Role.findOneAndUpdate(filter,data),
    deleteRoleDB:(filter)=>Role.findOneAndDelete(filter),
    getRoleDb:(filter)=>Role.findOne(filter),
    getAllRoleDb:(filter)=>Role.find(filter)
}