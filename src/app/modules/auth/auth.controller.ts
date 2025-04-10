import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { authServices } from "./auth.services";

const loginUser=catchAsync(async(req,res,next)=>{
       
    const result= await authServices.loginUser(req.body)
    const {refreshToken}=result;
    res.cookie('refreshToken',refreshToken,{
       httpOnly:true,
       secure:false,
       
    })
    sendResponse(res,{
       success:true,
       statusCode:200,
       message:'User logged in successful',
       data:{
           accessToken:result.accessToken,
           needPasswordChange:result.needPasswordChange
       }
    })
})

// for extractin refresht token then send access token as the access token duration 2-3 minute
const refreshToken=catchAsync(async(req,res,next)=>{
    const {refreshToken}=req.cookies
    console.log(refreshToken,'refreshtoken');
    
    const result= await authServices.refreshToken(refreshToken)
    sendResponse(res,{
       success:true,
       statusCode:200,
       message:'User logged in successful',
       data:result
 
    })
})


const changePassword=catchAsync(async(req:Request & {user?:any},res:Response,next:NextFunction)=>{

    const user=req.user;
    const result= await authServices.changePassword(user,req.body)
    sendResponse(res,{
       success:true,
       statusCode:200,
       message:'User logged in successful',
       data:result
 
    })
})

const forgetPassword=catchAsync(async(req:Request,res:Response)=>{
  const result=await authServices.forgetPassword(req.body)

  sendResponse(res,{
    success:true,
    statusCode:200,
    message:'forget',
    data:result

 })
  
})

const resetPassword=catchAsync(async(req,res)=>{
     const token = req.headers.authorization || ''
     console.log('tokekek',token);
     console.log(req.body)

     const result= authServices.resetPassword(token,req.body)
     sendResponse(res,{
        success:true,
        statusCode:200,
        message:'password reset successful',
        data:result
    
     })
})


export const AuthController={
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword
    
}