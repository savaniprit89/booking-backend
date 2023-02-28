import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import hotelRoute from './routes/hotel.js'
import roomRoute from './routes/room.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//cokeiparser
dotenv.config()
const app=express()
const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db")
} catch (error) {
    throw error//intial connection
}}
mongoose.connection.on("disconnected",()=>{
console.log("mdb disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("mdb connected")
    })
//dotenv for environment variable

app.get('/',(req,res)=>{
    res.send("hello")
})

//middleware   -------------------------
app.use(express.json())//for json object send to api=
app.use(cors())
app.use('/auth',authRoute)
app.use('/hotel',hotelRoute)
app.use('/users',userRoute)
app.use('/room',roomRoute)
app.use(cookieParser())
app.use((err,req,res,next)=>{


  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
    //when respone from any above api comes its come here before sending response

    //if these route used befiore express json then it would be called first and tehn go to next middleware //next()
})
app.listen(process.env.port||9000,()=>{
    connect()
    console.log("connected to backend.")
})
//npm start