const express = require('express');
const mongoose = require('mongoose');
const User =require("../models/User");
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary');
const multer = require("multer");
const app = express();

const jwt = require('jsonwebtoken');
cloudinary.config({
  cloud_name: "dgpmiwyjy",
    api_key:"776845688335874",
    api_secret:"EtHWFAKRl_fpYPVNCAKzOKPc4hM",
});

  
module.exports.signUp=async(req,res)=>{
    
    const {username,email,password}=req.body.formData;
    const {image} =req.body;

    console.log(req.body)
    console.log(image);
    if(!username || !email || !password){
        return res.json({msg:"fill all fiels",
            success:false
        });
    }
    
    const checkUsername=await User.findOne({username});
    console.log(checkUsername)
    if(checkUsername){

        return res.json({msg:"Username must be unique",
            success:false
        });
    }
    const checkuser=await User.findOne({email});
  
    if(checkuser ){
        return res.json({msg:"email already exist",
            success:false
        });
    }

    const hashPassword = await bcryptjs.hash(password,12);
    const user=new User({
        username,
        email,
        password:hashPassword,
        profile:image
    })
  await user.save().then(()=>console.log("User Signup successfully"))
.catch((err)=>console.log(err))

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    name: user.name,
  },
  "CLIENT_SECRET_KEY",
  { expiresIn: "5d" }
);


const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 5);  // 5 days from today
res.cookie("jwt", token, {
  httpOnly: false,
  secure: false,
  expires: expireDate,
  path: "/",
}).json({
    
  username:user.username,
  email:user.email,
  image:user.profile,
  id:user._id, 
  token,
  msg:"Login successfully", 
  success:true
 });



}
module.exports.login=async(req,res)=>{
    
    const {email,password}=req.body;
    if( !email || !password){
        return res.json({msg:"fill all fiels",success:false});
    }


    const checkuser=await User.findOne({email});

    if(!checkuser){
        return res.json({msg:"user did not exist",success:false});
    }
     
    const UserPassword = await bcryptjs.compare(password,checkuser.password);
    if(UserPassword){
      const token = jwt.sign(
        {
          id: checkuser._id,
          email:checkuser.email,
          name: checkuser.name,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "5d" }
      );
   
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 5);  
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: false, 
      expires: expireDate,
      path: "/",
    }).json({
      username:checkuser.username,
      email:checkuser.email,
      image:checkuser.profile,
      id:checkuser._id, 
      token,
      msg:"Login successfully", 
      success:true
    });
       
    }
    else{
        return res.json({msg:"incorrect password",success:false});
    }
   
}


module.exports.getAllUsers = async (req, res) => {
    try {
       
        const currUser = req.user.id;  
        // console.log(req.user); 
        
     
        const allUsers = await User.find({ _id: { $ne: currUser } }).select("-password");
        // console.log(allUsers)
        return res.status(200).json({ allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching users." });
    }
};




module.exports.filteruser = async (req, res) => {

    const { query}=req.params; 
    console.log(query);
  
    if (!query) {
      return res.json({ msg: "Please enter the name or email", success: false });
    }
  
    try {
      const currUser = req.user.id; 
      const users = await User.find({ _id: { $ne: currUser },
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      }).limit(10);
  
      console.log(users)
      if (users.length > 0) {
        res.json({
          users,
          msg: "Users found",
          success: true
        });
      } else {
        res.json({
          users: [],
          msg: "No users found",
          success: false
        });
        console.log("No user found");
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: "An error occurred while searching users",
        success: false
      });
    }
  };



  module.exports.updateProfile = async (req, res) => {
    const {username,email}=req.body.formdata;
    const {image} =req.body;
    const userId = req.user.id;
  
    if (!username && !email && !image) {
      return res.status(400).json({ msg: 'No fields to update provided', success: false });
    }
    const user_name=await User.findOne({username});
        if(user_name){
            return res.json({msg:"Username must be unique",success:false});
        }
   const updateData={};
    if (username){
       updateData.username = username;
    }
    if (email){
      updateData.email = email;
    } 
    if (image){
      updateData.profile = image;
    } 
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (updatedUser) {
        res.json({
          username: updatedUser.username,
          email: updatedUser.email,
          image: updatedUser.profile,
          id: updatedUser._id,
          token: generateToken(updatedUser._id.toString(), res),
          msg: "Profile Updated",
          success: true
        });
      } else {
        res.json({
          msg: "An error occurred while updating profile",
          success: false
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  module.exports.logout = (req, res) => {
    res.clearCookie("jwt").json({
      success: true,
      msg: "Logged out successfully!",
    });
  };
  