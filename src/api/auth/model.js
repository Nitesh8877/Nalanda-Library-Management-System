const {Schema,model}=require('mongoose');

const AuthSchema=new Schema({
    userId:{
        type:String,
    },
    token:{
        type:String,
    },

},{timestamps:true})

const Auth=model("auths", AuthSchema);

module.exports=Auth;