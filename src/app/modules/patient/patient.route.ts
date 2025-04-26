import { PrismaClient, UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";


import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { PatientController } from "./patient.controller";



const router = express.Router();



router.get("/",auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), PatientController.getAllFromDb);
router.get('/:id', auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),PatientController.getByIdFromDb)
router.patch('/:id',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),  PatientController.updateIntoDb)
router.delete('/:id', auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),PatientController.deleteFromDb)
router.patch('/soft/:id',auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), PatientController.softDeleteFromDb)

export const PatientRoutes = router;
