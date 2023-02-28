import express  from "express";

const router=express.Router()
import User from "../model/User.js";
import  {verifyadmin, verifytoken, verifyuser}  from "../utils/verifytoken.js";
/*
router.get("/checkauth",verifytoken,(req,res,next)=>{//for checking that requester had had token for nott
  
res.send("hello user")
})
router.get("/checkuser/:id",verifyuser,(req,res,next)=>{//for checking it is user
  
    res.send("hello user and you can delete you acoount")
    })
    router.get("/checkadmin/:id",verifyadmin,(req,res,next)=>{//for checking that user is admin or not
  
        res.send("hello admin and you can all delete you acoount")
        })*/
        //if verifyuser then he can do his task other wise admon only
        
router.put('/:id',verifyuser,async(req,res,next)=>{
    try {
     const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
     res.status(200).json(updatedUser)
 } catch (error) {
 
     next(error)
 }})
 router.delete('/:id',verifyuser,async(req,res,next)=>{
    try {
            const updatedUser=await User.findByIdAndDelete(req.params.id)
            res.status(200).json("delete")
        } catch (error) {
         
         
            next(error)
        }})
    router.get('/:id',verifyuser,async(req,res,next)=>{
    try {
                const uUser=await User.findById(req.params.id)
                res.status(200).json(uUser)
            } catch (error) {
                next(error)
            }})
    
    router.get('/',verifyadmin,async(req,res,next)=>{
    try {
                    const uuser=await User.find()
                    res.status(200).json(uuser)
                } catch (error) {
                    next(error)
                }})

export default router