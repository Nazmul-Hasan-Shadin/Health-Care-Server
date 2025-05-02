import catchAsync from "../../../helpers/catchAsync";
import { fileUploader } from "../../../helpers/fileUploader";
import sendResponse from "../../../helpers/sendResponse";
import pick from "../../../shared/pick";
import { ScheduleServices } from "../schedule/schedule.services";
import { DoctorScheduleServices } from "./doctorSchedule.services";



// to do => get all doctorschedule

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

const getMySchedule = catchAsync(async (req, res) => {
  const filters=pick(req.query,['startDate','endDate','isBooked'])
  const options=pick(req.query,['limit','page','sortBy','sortOrder'])
  const user=req.user
  const result = await DoctorScheduleServices.getMySchedule(filters,options,user);


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: " My Schedule has retrieved",
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req, res) => {

  const user=req.user
  const result = await DoctorScheduleServices.deleteFromDb(user,req.params.id);


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: " My Schedule deleted successfully",
    data: result,
  });
});





export const DoctorScheduleController = {
    createDoctorSchedule,
    getMySchedule,
    deleteFromDb

};
