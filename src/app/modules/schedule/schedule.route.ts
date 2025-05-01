import { PrismaClient, UserRole } from "@prisma/client";

import express from 'express'
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";



const router = express.Router();



router.post("/",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),ScheduleController.createSchedule);
router.get("/",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.DOCTOR),ScheduleController.getAllSchedule);

export const ScheduleRoutes = router;
