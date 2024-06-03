const {Schema,model}=require('mongoose');
const { USER_STATUS } = require('../../utils/constant');

const UserScehma=new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
    },
    status:{
        type:String,
        enum:USER_STATUS,
        default:USER_STATUS.ACTIVE
    },
    role:{
        type:Schema.Types.ObjectId
    }

},{timestamps:true})

const User=model("users", UserScehma);

module.exports=User;