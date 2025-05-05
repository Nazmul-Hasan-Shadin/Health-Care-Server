import express, { NextFunction, Request, Response } from "express";

import config from "../../../config";
import { Secret } from "jsonwebtoken";
import auth from "../../middlewares/auth";

import { UserRole } from "@prisma/client";
import { PaymentController } from "./pament.controller";



const router = express.Router();
router.get('/ipn',PaymentController.validatePayment)

router.post('/init-payment/:appointmentId',PaymentController.initPayment)



export const PaymentRoute = router;
