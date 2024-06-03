const User=require('./model')


module.exports={
    addUserDB:(data)=>User.create(data),
    getUserDB:(filter)=>User.findOne(filter)
}