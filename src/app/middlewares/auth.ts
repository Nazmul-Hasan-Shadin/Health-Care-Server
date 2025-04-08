import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import AppError from "../errors/AppErrors";

const auth=(...roles:string[])=>{
    
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.headers.authorization;
            if (!token) {
                throw new AppError(501,'You are unauthorized')
            }
            const verifiedUser= jwtHelpers.verifyToken(token,config.jwt.accessToken as Secret) 
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new Error('You are not authorized') 
            }
            next()
            
            console.log(token)
        } catch (error) {
            next(error)
        }
    }
 }

 export default auth