import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

import { AdminController } from "./admin.controller";

import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.zodValidation";


const router = express.Router();



router.get("/", AdminController.getAllFromDb);
router.get('/:id', AdminController.getByIdFromDb)
router.patch('/:id', validateRequest(adminValidationSchema.update), AdminController.updateIntoDb)
router.delete('/:id', AdminController.deleteFromDb)
router.patch('/soft/:id', AdminController.softDeleteFromDb)

export const adminRoutes = router;
