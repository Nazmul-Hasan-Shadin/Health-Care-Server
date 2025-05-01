import catchAsync from "../../../helpers/catchAsync";
import { fileUploader } from "../../../helpers/fileUploader";
import sendResponse from "../../../helpers/sendResponse";
import pick from "../../../shared/pick";
import { ScheduleServices } from "./schedule.services";


const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createSchedule(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Schedule has created",
    data: result,
  });
});

const getAllSchedule = catchAsync(async (req, res) => {
    const filters=pick(req.query,['startDate','endDate'])
    const options=pick(req.query,['limit','page','sortBy','sortOrder'])
    const user=req.user
    const result = await ScheduleServices.getAllSchedule(filters,options,user);

  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Schedule has retrieved",
      data: result,
    });
  });


export const ScheduleController = {
  createSchedule,
  getAllSchedule

};
