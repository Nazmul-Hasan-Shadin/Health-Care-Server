import catchAsync from "../../../helpers/catchAsync";
import { fileUploader } from "../../../helpers/fileUploader";
import sendResponse from "../../../helpers/sendResponse";
import { DoctorScheduleServices } from "./doctorSchedule.services";
import { ScheduleServices } from "./schedule.services";


const createDoctorSchedule = catchAsync(async (req, res) => {
    const user=req.user;
  const result = await DoctorScheduleServices.createDoctorScheduleIntoDb(user,req.body);
  

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "  DoctorSchedule has selected",
    data: result,
  });
});


export const DoctorScheduleController = {
    createDoctorSchedule,

};
