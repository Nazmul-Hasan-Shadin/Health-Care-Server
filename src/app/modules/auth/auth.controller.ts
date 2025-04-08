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

export const AuthController={
    loginUser
}