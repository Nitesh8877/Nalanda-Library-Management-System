const  jwt  = require("jsonwebtoken");
const { badReq, iserror,rm } = require("../../utils/common");
const { responseMessage, USER_STATUS, responseCode } = require("../../utils/constant");
const { getUserDB } = require("../user/query");
const { updateAuth, addAuth } = require("./query");
const bcrypt=require('bcryptjs')

module.exports={
    singin:async(req,res)=>{
        const {email, password}=req.body;
        try {
            let user =await getUserDB({email});
            if(!user)
                return badReq(res,responseMessage.USER_NOT)
            if(user?.status===USER_STATUS.INACTIVE) return badReq(res,responseMessage.INVALID_CREDENTIAL);
            const isPasswordValid=bcrypt.compareSync(password,user?.password)
            if(!isPasswordValid){
             return badReq(res,responseMessage.INVALID_CREDENTIAL)
            } 
            const token=jwt.sign({user},"jklsdfklsdflks",{expiresIn:36000})
            if(token){
                await updateAuth({userId:user?._id});
                await addAuth({userId:user?._id, token:token})
            return rm(res, responseCode.OK, responseMessage.LOGIN_SUCCESS, {user, token})}
        } catch (error) {
            console.log(error,"something went wrong");
            return iserror(res)
        }
    },
   
}