import express, { Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.const";
import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../helpers/catchAsync";



const getAllFromDb =catchAsync(async (req, res,next) => {
 

    const filters = pick(req.query, adminFilterableField); //http://locahost.com?name=shadin& email=joy@gmail.com& contactnumber=01302
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options, 'iam optoions');

    console.log(options);

    const result = await AdminServices.getAllFromDb(filters, options);
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


    const result = await AdminServices.getByIdFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All admin data retrived',

      data: result
    })

});

const updateIntoDb =catchAsync( async (req: Request, res: Response) => {
  const { id } = req.params;
 
    const result = await AdminServices.updateIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'updated',

      data: result
    })
  
});

const deleteFromDb =catchAsync( async (req: Request, res: Response) => {
  const { id } = req.params;


    const result = await AdminServices.deleteINTODB(id);
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

    const result = await AdminServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'soft deleted',

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






export const AdminController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb
};
