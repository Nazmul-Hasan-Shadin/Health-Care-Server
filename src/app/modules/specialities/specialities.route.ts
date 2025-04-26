import express, { NextFunction, Request, Response } from "express";

import { UserRole } from "@prisma/client";
import { SpecialistController } from "./specalities.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialtiesValidation } from "./specialties.validate";



const router = express.Router();
router.get('/',SpecialistController.getAllSpecialties)
router.post('/',fileUploader.upload.single('file'),auth(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.PATIENT,UserRole.DOCTOR),(req,res,next)=>{

    req.body=SpecialtiesValidation.createSpecialties.parse(JSON.parse(req.body.data))
    SpecialistController.createSpecialist(req,res,next)
  })

  router.post('/',SpecialistController.getAllSpecialties)
  router.delete('/:id',SpecialistController.deleteSpecialties)





export const SpecialtiesRoutes = router;
