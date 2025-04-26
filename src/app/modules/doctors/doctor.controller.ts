import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { DoctorServices } from "./doctor.services";

const updateDoctor=catchAsync(async(req,res,next)=>{
    const result=await DoctorServices.updateDoctorFromDb(req.params.id,req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctor update successful",
        data: result,
      });
})

export const DoctorController={
    updateDoctor
}