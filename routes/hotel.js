import express  from "express";
import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";
import { createerror } from "../utils/error.js";
import { verifyadmin } from "../utils/verifytoken.js";

const router=express.Router()



//create

//if createhotel as controller as function and async to last it has content thar it will be router.post('/',creTehotel)
/*
router.post('/',async(req,res,next)=>{


    const newhotel=new Hotel(req.body)
try {
    const savehotel=await newhotel.save()
    res.status(200).json(savehotel)
} catch (error) {
    next(error)
}})


router.put('/:id',async(req,res,next)=>{
   try {
    const updatedhotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedhotel)
} catch (error) {

    next(error)
}})



router.delete('/:id',async(req,res,next)=>{
try {
        const updatedhotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("delete")
    } catch (error) {
     
     
        next(error)
    }})
router.get('/:id',async(req,res,next)=>{
try {
            const updatedhotel=await Hotel.findById(req.params.id)
            res.status(200).json(updatedhotel)
        } catch (error) {
            next(error)
        }})

        router.get('/',async(req,res,next)=>{
try {
                const updatedhotel=await Hotel.find()
                res.status(200).json(updatedhotel)
            } catch (error) {
                next(error)
            }})
export default router

these were earlier route which can be access by anyone without login
*/
router.post('/',async(req,res,next)=>{

console.log("Sds",req.body)
    const newhotel=new Hotel(req.body)
try {
    const savehotel=await newhotel.save()
    console.log("asa",savehotel)
    res.status(200).json(savehotel)
} catch (error) {
    console.log(error)
    next(error)
}})


router.put('/:id',verifyadmin,async(req,res,next)=>{
   try {
    const updatedhotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedhotel)
} catch (error) {

    next(error)
}})



router.delete('/:id',verifyadmin,async(req,res,next)=>{
try {
        const updatedhotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("delete")
    } catch (error) {
     
     
        next(error)
    }})
router.get('/find/:id',async(req,res,next)=>{
try {
            const updatedhotel=await Hotel.findById(req.params.id)
            res.status(200).json(updatedhotel)
        } catch (error) {
            next(error)
        }})

      /*  get all hotel
      router.get('/',async(req,res,next)=>{  it is like /hotel
try {
                const updatedhotel=await Hotel.find()
                res.status(200).json(updatedhotel)
            } catch (error) {
                next(error)
            }})*/
            router.get('/',async(req,res,next)=>{//it is route lin /hotel?featuredproperyt=true&limit=2
                const{min,max,...others}=req.query;
                console.log("prret",req.query)
                try {
                                //const uhotel=await Hotel.find(req.query).limit(req.query.limit)//it is route lin /hotel?featuredproperyt=true&limit=2
                                const uhotel=await Hotel.find({...others,cheapestprice:{$gt:min|1, $lt : max ||999}} ).limit(req.query.limit)
                                // /hotel?featuredproperyt=true&limit=2&min=10&max=2000    //otherdetail in query will as featureproperty
                                res.status(200).json(uhotel)
                            } catch (error) {
                                next(error)
                            }})
                            router.get('/city',async(req,res,next)=>{//it is route lin /hotel/city?city=berlin
                              
                console.log(req.query)
                                try {
                                                //const uhotel=await Hotel.find(req.query).limit(req.query.limit)//it is route lin /hotel?featuredproperyt=true&limit=2
                                                const uhotel=await Hotel.find(req.query)
                                             
                                                res.status(200).json(uhotel)
                                            } catch (error) {
                                                next(error)
                                            }})
export default router


router.get('/countbycity',async(req,res,next)=>{
    //const cities=req.query.cities//berlin,madrid,london
    const cities=req.query.cities.split(',')//converting them to array
    try {
                    const list=  await Promise.all(cities.map(city=>{
                        return Hotel.countDocuments({city:city})
                        
                    }))
                    res.status(200).json(list)
} catch (error) {
                    next(error)
                }})
//hotel/countbycity?cities=berlin,madrid,london

router.get('/countbytype',async(req,res,next)=>{

    try {
                
                    const hotelcount=await Hotel.countDocuments({type:"hotel"})
                 const appartmentcount=await Hotel.countDocuments({type:"apartment"})
                 const resortcount=await Hotel.countDocuments({type:"resort"})
                 const villacount=await Hotel.countDocuments({type:"villa"})
                 const cabincount=await Hotel.countDocuments({type:"cabin"})
                 
                    res.status(200).json([
                        {type:"hotel",count:hotelcount},
                        {type:"appartment",count:appartmentcount},
                        {type:"resort",count:resortcount},
                        {type:"villa",count:villacount},
                        {type:"cabin",count:cabincount}
                    ])
                } catch (error) {
                    next(error)
                }})

router.get('/room/:id',async(req,res,next)=>{//here id will send will be hotel id
try {
    const hotel=await Hotel.findById(req.params.id);
  
    const list = await Promise.all(
        hotel.rooms.map(async (ro) => {
            console.log("preet",ro);
          const r= await Room.findById(ro) 
          console.log("savani",r);

          return r;
        }))
    
    res.status(200).json(list)
} catch (error) {
    next(error)
}
})


//now only admin can delete,update and post hotel