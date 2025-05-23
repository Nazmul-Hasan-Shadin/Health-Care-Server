import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { PaymentServices } from "./payment.services";
import { validate } from "uuid";

const initPayment =catchAsync( async (req: Request, res: Response) => {

   const {appointmentId}=req.params
     const result = await PaymentServices.initPayment(appointmentId);
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: 'Payment init successful',
 
       data: result
     })
   
 });
 const validatePayment =catchAsync( async (req: Request, res: Response) => {
      
      const result = await PaymentServices.validatePayment(req.query);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Payment validation successful',
  
        data: result
      })
    
  });
 




 export const PaymentController={
   initPayment,
   validatePayment
 }