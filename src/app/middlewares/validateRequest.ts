import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest=(zodSchema:AnyZodObject)=>{
     
    return  async (req:Request,res:Response,next:NextFunction)=>{
       try {
        const parseddata=await zodSchema.parseAsync({
            body:req.body
        })
       return  next()
      console.log(parseddata,'iam parseddat');
       } catch (error) {
         next(error)
       }
      
    }
    
}
export default validateRequest