import express  from "express";
import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import { createerror } from "../utils/error.js";
import jwt from 'jsonwebtoken'
const router=express.Router()

router.post("/register",async(req,res,next)=>{
   try {
      console.log(req.body);
    const salt=bcrypt.genSaltSync(10);
    const hash =bcrypt.hashSync(req.body.password,salt)
    const newuser=new User({
        /*username:req.body.username,
        email:req.body.username,   it waas taking first these only now taking all come in body*/
        ...req.body,
        password:hash
    })
    await newuser.save()
    res.status(201).send("user suceess created")

   } catch (error) {
    next(error)
   }
})

router.post("/login",async(req,res,next)=>{
    try {
      const uname=req.body.username

 const Yser = await User.findOne({ username:uname})
 console.log(Yser)
 if(!Yser){
    console.log("ndksn")
    return next(createerror(404, "User not found!"));
 
    
    
 }
     //res.status(201).send("user suceess created")
    const iscorrect= await bcrypt.compare(req.body.password,Yser.password)
     if(!iscorrect){
      
        const errorr="password incorrect"
        return next(createerror(400, "Wrong password or username!"));
     } 
  //till here checking password and username
const token =jwt.sign({id:Yser._id,isAdmin:Yser.isAdmin},process.env.JWT)
const {password,isAdmin,...otherDetails}=Yser._doc
//jsonwebtoken as cookie    and it is used to decide admin or not
res
.cookie("access_token", token, {
  httpOnly: true,
})
.status(200)
.json({ details: { ...otherDetails },token, isAdmin });


    } catch (error) {
      next(error);
    }
 })

export default router