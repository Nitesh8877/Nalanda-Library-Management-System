const jwt=require('jsonwebtoken');
const { rm } = require('../utils/common');
const { responseCode, responseMessage } = require('../utils/constant');

const verifyToken=(req, res,next)=>{
    let token=req.headers['x-access-token'];
    if(!token){
        return rm(res,responseCode.UNAUTHORIZED, "Unauthorized")
    }
    jwt.verify(token,"jklsdfklsdflks",(err,decoded)=>{
        if(err){
            return rm(res, responseCode.UNAUTHORIZED, "Unauthorized")
        }
        req.authUser=decoded?.user;
        next();
    })
}


module.exports=verifyToken