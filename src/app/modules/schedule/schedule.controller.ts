import catchAsync from "../../../helpers/catchAsync";
import { fileUploader } from "../../../helpers/fileUploader";
import sendResponse from "../../../helpers/sendResponse";
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


export const ScheduleController = {
  createSchedule,

};
