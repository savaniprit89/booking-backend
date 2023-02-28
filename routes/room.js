import express  from "express";
import { createerror } from "../utils/error.js";
import Room from '../model/Room.js'
import Hotel from '../model/Hotel.js'
import { verifyadmin } from "../utils/verifytoken.js";
const router=express.Router()


//after creating rooom its id should be added to hotel model room array

router.post("/:hotelid",async(req,res,next)=>{
    const hotelid=req.params.hotelid;
    const newroom= new Room(req.body)
    try {
        const saveDroom =await newroom.save()
        try {//adding room id to hotel model
            await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:saveDroom._id}})//push is used to add item in array in model
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveDroom)
    } catch (error) {
        next(error)
    }
    
})

router.put("/:id",verifyadmin,async(req,res,next)=>{
    try {
        const updatedroom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedroom)
    } catch (error) {
    
        next(error)
}
//
})
router.put("/availability/:id",async(req,res,next)=>{
    console.log("hii")
    try {
        const updatedroom=await Room.updateOne({"roomnumber._id":req.params.id},{
            $push:{
                "roomnumber.$.unavailabledates":req.body.dates//here goinmg in array inside unavailable
            }
        })
        
        res.status(200).send("room status updated")
    } catch (error) {
    
        next(error)
}
//
})

router.delete('/:id/:hotelid',verifyadmin,async(req,res,next)=>{
    const hotelid=req.params.hotelid;
    try {
            const updatedroom=await Room.findByIdAndDelete(req.params.id)
            try {//adding room id to hotel model
                await Hotel.findByIdAndUpdate(hotelid,{$pull:{rooms:req.params.id}})//push is used to add item in array in model
            } catch (error) {
                next(error)
            }
            res.status(200).json("delete")
        } catch (error) {
         
         
            next(error)
        }})
        router.get('/:id',async(req,res,next)=>{
            try {
                        const updatedroom=await Room.findById(req.params.id)
                        res.status(200).json(updatedroom)
                    } catch (error) {
                        next(error)
                    }})
            
                    router.get('/',async(req,res,next)=>{
            try {
                            const rooms=await Room.find()
                            res.status(200).json(rooms)
                        } catch (error) {
                            next(error)
                        }})

export default router