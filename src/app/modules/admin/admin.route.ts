import { PrismaClient, UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

import { AdminController } from "./admin.controller";

import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.zodValidation";
import auth from "../../middlewares/auth";


const router = express.Router();



router.get("/",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), AdminController.getAllFromDb);
router.get('/:id', auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),AdminController.getByIdFromDb)
router.patch('/:id',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), validateRequest(adminValidationSchema.update), AdminController.updateIntoDb)
router.delete('/:id', auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),AdminController.deleteFromDb)
router.patch('/soft/:id',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), AdminController.softDeleteFromDb)

export const adminRoutes = router;
