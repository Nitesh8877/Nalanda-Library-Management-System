const { getRoleDb } = require('../api/role/query');
const { rm } = require('../utils/common');
const { responseCode, responseMessage } = require('../utils/constant');

const roleCheck=async(req, res,next)=>{
    let role=req.authUser.role;
    let data=await getRoleDb({_id:role});
   if(data?.key==="ADMIN")next();
   else return rm(res, responseCode.UNAUTHORIZED, "Unauthorized")
}


module.exports=roleCheck