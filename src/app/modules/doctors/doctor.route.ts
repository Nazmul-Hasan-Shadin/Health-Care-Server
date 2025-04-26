import express, { NextFunction, Request, Response } from "express";
import { DoctorController } from "./doctor.controller";





const router = express.Router();
router.get('/',DoctorController.getAllDoctor)

router.patch('/:id',DoctorController.updateDoctor)




export const DoctorRoutes = router;
