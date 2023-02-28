import jwt  from "jsonwebtoken";

import { createerror } from "./error.js";

export const verifytoken=(req,res,next)=>{
    console.log("sds",req.headers.authorization);
    const token =req.headers.authorization.split(' ')[1]

    console.log(token)
    if(!token){
        return next(createerror(401,"not authenticateed"))
    }
jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err){
        return next(createerror(401,"not valid token"))
    }
  console.log("hii")
  req.user=user
next()
})  
        
    
}

export const verifyuser=(req,res,next)=>{
    verifytoken(req,res,next,()=>{
        if(req.user.id === req.params.id|| req.user.isAdmin ){
            next()
        }
        else{
            if(err){
                return next(createerror(401,"not authorised"))
            }
        }
    })
}

export const verifyadmin=(req,res,next)=>{
    verifytoken(req,res,()=>{
        
        if( req.user.isAdmin ){
            next()
        }
        else{
            if(err){
                return next(createerror(401,"not authorised"))
            }
        }
    })
}
//
//63d916c903d4b7cfab0cbfc7