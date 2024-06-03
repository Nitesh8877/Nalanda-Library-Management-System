
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dbConfig = require('./src/config/db.config');
const serverConfig = require('./src/config/server.config');
const pubRouter=require('./src/route/pub');
const verifyToken = require('./src/middleware/auth');
const Router = require('./src/route/api');
const User=require('./src/api/user/model')
const Role=require('./src/api/role/model')
const bcrypt=require('bcryptjs');
//Initializing express
const app = express();
//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * DB connection 
 */
app.use(express.json());
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"));
db.once("open", () => {
    console.log("Connected to mongo DB");
//   init()
})
async function init(){
   let adminRole= await Role.create({name:"Admin",key:"ADMIN"});
  let memberRole=  await Role.create({name:"Member",key:"MEMBER"});
    await User.create({name:"Admin",email:"admin1@gmail.com",password:bcrypt.hashSync("Admin@123",8),role:adminRole._id});
    await User.create({name:"Member",email:"member1@gmail.com",password:bcrypt.hashSync("Member@123",8), role:memberRole._id});
}
app.use('/pub/api', pubRouter);
app.use('/api', verifyToken,Router);

app.listen(serverConfig.PORT, () => {
    console.log("server started is this port number: ", serverConfig.PORT);
})