import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserValidation } from "./userValidation";
import { UserRole } from "@prisma/client";



const router = express.Router();

router.post("/create-admin",auth("ADMIN","SUPER_ADMIN"),fileUploader.upload.single('file'),
 (req:Request,res:Response,next:NextFunction)=>{
  
   req.body =UserValidation.createAdmin.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req,res,next)
 }
);

router.post("/create-patient",fileUploader.upload.single('file'),
 (req:Request,res:Response,next:NextFunction)=>{
  
   req.body =UserValidation.createPatient.parse(JSON.parse(req.body.data))
    return userController.createPatient(req,res,next)
 }
);

router.get("/",auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
 (req:Request,res:Response,next:NextFunction)=>{
  
   
    return userController.getallUser(req,res,next)
 }
);

router.patch('/:id/status',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),userController.changeProfileStatus)



export const UserRoutes = router;
