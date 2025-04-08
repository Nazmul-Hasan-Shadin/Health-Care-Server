import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import { AdminController } from "./admin.controller";


const router = express.Router();

router.get("/", AdminController.getAllFromDb);
router.get('/:id',AdminController.getByIdFromDb)
router.patch('/:id',AdminController.updateIntoDb)
router.delete('/:id',AdminController.deleteFromDb)
router.patch('/soft/:id',AdminController.softDeleteFromDb)

export const adminRoutes = router;
