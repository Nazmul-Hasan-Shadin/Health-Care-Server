import { PrismaClient, UserRole } from "@prisma/client";

import express from 'express'

import auth from "../../middlewares/auth";
import { DoctorScheduleController } from "./doctorSchedule.controller";



const router = express.Router();



router.post("/",auth(UserRole.ADMIN,UserRole.DOCTOR),DoctorScheduleController.createDoctorSchedule);
router.get("/my-schedule",auth(UserRole.DOCTOR),DoctorScheduleController.getMySchedule);
export const DoctorSchedule = router;
