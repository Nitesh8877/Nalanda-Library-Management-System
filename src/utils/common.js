
const rm=(res,code,message,data={})=>{
    res.send({status:code,message:message,data:data})
}
const badReq=(res,message="Bad Request")=>{
    res.send({status:400,message:message,data:{}});
}
const iserror=(res)=>{
    res.send({status:500, message:"Something went wrong",data:{}});
}
const noContent=(res)=>{
    res.send({status:204,message:"Data not fount", data:{}})
}

module.exports={
    rm,badReq,iserror,noContent
}