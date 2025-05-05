import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { AppointmentServices } from "./appointment.services";
import { IAuthUsers } from "../../interfaces/common";
import pick from "../../../shared/pick";

const createAppointment =catchAsync( async (req: Request, res: Response) => {
    const { id } = req.params;
   
      const result = await AppointmentServices.createAppointmentIntoDb(req.user,req.body);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Appointment created successful',
  
        data: result
      })
    
  });

  const getMyAppointment =catchAsync( async (req: Request & {user?:IAuthUsers}, res: Response) => {
     const user=req.user;
     const filters=pick(req.query,['status','paymentStatus'])
     const options=pick(req.query,['page','limit','sortBy','sortOrder'])
   
      const result = await AppointmentServices.getMyAppointment(user,filters,options);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Appointment retrieved successful',
  
        data: result
      })
    
  });


  const changeAppointmentStatus =catchAsync( async (req: Request & {user?:IAuthUsers}, res: Response) => {
    const { id } = req.params;
    const {status}=req.body
    const user=req.user;
      const result = await AppointmentServices.changeAppointmentStatus(id,status,user);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Appointment status changed successful',
  
        data: result
      })
    
  });


  export const AppointmentController={
    createAppointment,
    getMyAppointment,
    changeAppointmentStatus
  }