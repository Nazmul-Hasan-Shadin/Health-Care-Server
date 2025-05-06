import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";

import { validate } from "uuid";
import { PrescriptionServices } from "./prescription.services";
import { IAuthUsers } from "../../interfaces/common";

 const createPrescription =catchAsync( async (req: Request & {user?:IAuthUsers}, res: Response) => {
      const user=req.user
      const result = await PrescriptionServices.createPrescription(user,req.body);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Prescription created successful',
  
        data: result
      })
    
  });
 
  const getMyPrescriptionPatient =catchAsync( async (req: Request & {user?:IAuthUsers}, res: Response) => {
    const user=req.user
    const result = await PrescriptionServices.getMyPrescription(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Prescription retrieved successful',

      data: result
    })
  
});



 export const PrescriptionController={
createPrescription,
getMyPrescriptionPatient
 }