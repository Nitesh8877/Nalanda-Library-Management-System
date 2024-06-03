const {Schema,model}=require('mongoose');

const UserScehma=new Schema({
    name:{
        type:String,
        required:true,
    },
    key:{
        type:String,
        requried:true,
    },

},{timestamps:true})

const Role=model("roles", UserScehma);

module.exports=Role;