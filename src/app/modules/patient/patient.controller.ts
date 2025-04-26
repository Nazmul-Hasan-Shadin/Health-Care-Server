import express, { Request, RequestHandler, Response } from "express";

import pick from "../../../shared/pick";

import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../helpers/catchAsync";
import { PatientServices } from "./patient.services";



const getAllFromDb =catchAsync(async (req, res,next) => {
 

    const filters = pick(req.query, ['name','email','contactNumber']); //http://locahost.com?name=shadin& email=joy@gmail.com& contactnumber=01302
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
   

    console.log(options);

    const result = await PatientServices.getAllFromDb(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All admin data retrived',
      meta: result.meta,
      data: result.data
    })
  
   
  
})

const getByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;


    const result = await PatientServices.getByIdFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All Patient data retrieved',

      data: result
    })

});

const updateIntoDb =catchAsync( async (req: Request, res: Response) => {
  const { id } = req.params;
 
    const result = await PatientServices.updateIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Patent updated successful',

      data: result
    })
  
});

const deleteFromDb =catchAsync( async (req: Request, res: Response) => {
  const { id } = req.params;


    const result = await PatientServices.deleteINTODB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true, 
      message: 'Deleted',

      data: result
    })

})

const softDeleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await PatientServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'patient soft deleted',

      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};






export const PatientController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb
};
