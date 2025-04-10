import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserValidation } from "./userValidation";



const router = express.Router();

router.post("/",auth("ADMIN","SUPER_ADMIN"),fileUploader.upload.single('file'),
 (req:Request,res:Response,next:NextFunction)=>{
  
   req.body =UserValidation.createAdmin.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req,res,next)
 }
);

export const UserRoutes = router;
