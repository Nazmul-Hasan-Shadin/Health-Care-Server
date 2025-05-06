import express, { NextFunction, Request, Response } from "express";

import config from "../../../config";
import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";


import { PrescriptionController } from "./prescription.controller";
import { UserRole } from "@prisma/client";



const router = express.Router();
router.post('/',auth(UserRole.DOCTOR),PrescriptionController.createPrescription)
router.get('/my-prescription',auth(UserRole.PATIENT),PrescriptionController.getMyPrescriptionPatient)




export const PrescriptionRoute = router;
