import { PrismaClient, UserRole } from "@prisma/client";

import express from 'express'
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { DoctorScheduleController } from "./doctorSchedule.controller";



const router = express.Router();



router.post("/",auth(UserRole.ADMIN,UserRole.DOCTOR),DoctorScheduleController.createDoctorSchedule);

export const DoctorSchedule = router;
