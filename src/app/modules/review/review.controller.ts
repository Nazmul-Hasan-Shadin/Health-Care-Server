import { Request, Response } from "express";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { ReviewServices } from "./review.services";
import { IAuthUsers } from "../../interfaces/common";


//todo=getall review with filtering like patient email doctor email accessible by super admin
//get all prescription with filtering and add zod validation to all payload

const createSchedule = catchAsync(async (req:Request & {user?:IAuthUsers}, res:Response) => {
    
    const result = await ReviewServices.createReview(req.user,req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "review has added",
      data: result,
    });
  });

  export const ReviewController={
    createSchedule
  }