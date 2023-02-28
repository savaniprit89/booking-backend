import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    
    maxpeople:{type:Number,required:true},
    roomnumber:[{number:Number,unavailabledates:{type:[Date]}}]
},{timestamps:true})

export default mongoose.model('Room',userSchema)


//ex
/*
[
    {number:101,unav:[5/2/22,5/3/22]}
    {number:102,unav:[]}
    {number:103,unav:[]}
]
*/