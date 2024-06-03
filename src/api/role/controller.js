const { badReq, iserror, rm, noContent } = require("../../utils/common");
const { responseMessage, responseCode } = require("../../utils/constant");
const { getRoleDb, addRoleDB, updateRoleDB, deleteRoleDB, getAllRoleDb } = require("./query");

module.exports={
    addRole:async(req,res)=>{
        const {name}=req.body;
        try {
            let role =await getRoleDb({name});
            if(role){
                return badReq(res,responseMessage.ROLE_ALREADY_EXIST)
          }
            let created= await addRoleDB({name:name,key:name.toUpperCase()});
            if(created)
           { return rm(res, responseCode.CREATED, responseMessage.ADD_ROLE);}
            return badReq(res)
        } catch (error) {
            console.log(error,"something went wrong");
            return iserror(res)
        }
    },
    updateRole:async(req,res)=>{
        const {id}=req.params;
        const {name}=req.body;
        try {
           
            let role =await getRoleDb({_id:id});
            if(role?.name?.toLowerCase()!==name?.toLowerCase()){
                let role =await getRoleDb({name});
                if(role){
                return badReq(res,responseMessage.ROLE_ALREADY_EXIST)}
          }
            let updated= await updateRoleDB({_id:id},{name:name});
            if(updated)
           { return rm(res, responseCode.OK, responseMessage.UPDATE_ROLE);}
            return badReq(res)
        } catch (error) {
            console.log(error,"something went wrong");
            return iserror(res)
        }
    },
    getRole:async(req,res)=>{
        try {
            let role =await getAllRoleDb({});
            if(role)
           {
             return rm(res, responseCode.OK, responseMessage.GET_ROLE,role);
            }
            return noContent(res)
        } catch (error) {
            console.log(error,"something went wrong");
            return iserror(res)
        }
    },
    deleteRole:async(req,res)=>{
        const {id}=req.params;
        try {
            let role =await deleteRoleDB({_id:id});
            if(role)
           {
             return rm(res, responseCode.OK, responseMessage.DELETE_ROLE);
            }
            return badReq(res)
        } catch (error) {
            console.log(error,"something went wrong");
            return iserror(res)
        }
    },

}