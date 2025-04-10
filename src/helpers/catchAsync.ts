import { NextFunction, Request, RequestHandler, Response } from "express"

 const catchAsync=(func:RequestHandler)=>{
  
        return async (req:Request & {user?:any},res:Response,next:NextFunction)=>{
         
            try {
               await func(req,res,next,)
            } catch (error) {
                next(error)
            }
        }
    
 }

 export default catchAsync