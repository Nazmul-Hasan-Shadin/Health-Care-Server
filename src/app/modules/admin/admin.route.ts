import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import { AdminController } from "./admin.controller";


const router = express.Router();

router.get("/", AdminController.getAllFromDb);

export const adminRoutes = router;
