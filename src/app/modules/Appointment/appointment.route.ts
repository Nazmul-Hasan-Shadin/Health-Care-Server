import { PrismaClient, UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";


import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { AppointmentController } from "./appointment.controller";


 //todo =>zod schema for create appointmentt , getall appointment only accessible by  super admin and admin

const router = express.Router();


router.get("/my-appointment",auth(UserRole.PATIENT,UserRole.DOCTOR), AppointmentController.getMyAppointment);
router.post("/",auth(UserRole.PATIENT), AppointmentController.createAppointment);


export const AppointmentRoute = router;
