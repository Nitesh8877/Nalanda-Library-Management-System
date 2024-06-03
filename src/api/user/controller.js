
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { responseCode, responseMessage } = require('../../utils/constant');
const {rm, badReq, iserror}=require('../../utils/common');
const { addUserDB, getUserDB } = require('./query');

module.exports={
    signup:async(req,res)=>{
        try {
           
            let data={
                name:req.body.name,
                email:req.body.email,
                status:req.body.status,
                password:bcrypt.hashSync(req.body.password,8),
            }
            let email=await getUserDB({email:req.body.email});
            if(email) return rm(res,responseCode.CONFLICT,responseMessage.EMAIL_ALREADY )
            let user=await addUserDB(data)
            if(user)
                return rm(res, responseCode.CREATED, responseMessage.USER_CREATED_SUCCESS,user)
            return badReq(res)
            
        } catch (error) {
        console.log(error);
        return iserror(res)
        }
    },
}