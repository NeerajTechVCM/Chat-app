const express = require('express');
const mongoose = require('mongoose');
const User =require("./models/User.js");
// const app = express();
const middleware=require("./Middleware/middleware.js")
const userRoute=require("./Controller/user.js");
const message=require("./Controller/message.js")
const cors=require("cors");
const cookieParser = require('cookie-parser');
const { server,app } = require('./Socket.js');
const path=require("path");
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
  }

app.use(express.json());
app.use(cors({
    origin: 'https://chat-app-1-q0ke.onrender.com', 
    credentials: true, 
}));
// app.use(cors());
app.use(cookieParser());
app.post("/signUp",userRoute.signUp);
app.post("/login",userRoute.login);
app.get("/getAllUsers",middleware.secureRoute,userRoute.getAllUsers);
app.put("/updateProfile",middleware.secureRoute,userRoute.updateProfile);
    
app.post("/send/:id",middleware.secureRoute,message.sendmsg);
app.get("/get/:id",middleware.secureRoute,message.getmsg);
app.get("/search/:query",middleware.secureRoute,userRoute.filteruser);
// app.put("/profile/:url",userRoute.profile);


if(process.env.NODE_ENV==="production"){
    const dirPath=path.resolve();
      app.use(express.static(path.join(dirPath,'./client/dist')));
      app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,'client','dist','index.html'));
      })
    }

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("mongoDb Connected"))
.catch((err) => console.log(err))


server.listen(process.env.PORT, () => {
    console.log("server running on port 8080");
})