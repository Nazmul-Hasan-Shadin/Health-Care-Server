import { PrismaClient, UserRole } from "@prisma/client";

import express from 'express'
import { ScheduleController } from "./schedule.controller";



const router = express.Router();



router.get("/",ScheduleController.createSchedule);

export const ScheduleRoutes = router;
