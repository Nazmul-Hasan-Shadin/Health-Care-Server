import { NextFunction, Request, Response } from "express";
import { userService } from "./user.services";

const createAdmin = async (req: Request, res: Response,next:NextFunction) => {
 
  
   try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success:true,
      message:'Admin created succesfully',
      data:result
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.name,
        error:error
    })
    
   }
};

export const userController = {
  createAdmin,
};
