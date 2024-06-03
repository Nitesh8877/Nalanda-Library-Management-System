const Auth=require('./model');

module.exports={
    addAuth:(data)=>Auth.create(data),
    updateAuth:(filter)=>Auth.deleteMany(filter),
}