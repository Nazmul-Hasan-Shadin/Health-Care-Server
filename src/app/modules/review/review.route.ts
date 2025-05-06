import { PrismaClient, UserRole } from "@prisma/client";

import express from 'express'
import auth from "../../middlewares/auth";
import { ReviewController } from "./review.controller";



const router = express.Router();




router.post("/",auth(UserRole.PATIENT),ReviewController.createSchedule);

export const ReviewRoute = router;
