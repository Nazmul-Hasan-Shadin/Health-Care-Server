import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";
import { DoctorServices } from "./doctor.services";



//to do 


const updateDoctor=catchAsync(async(req,res,next)=>{
    const result=await DoctorServices.updateDoctorFromDb(req.params.id,req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctor update successful",
        data: result,
      });
})

const getAllDoctor=catchAsync(async(req,res,next)=>{
    const result=await DoctorServices.getAllDoctorFromDb(req.query)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Doctor are retrieved successful",
        data: result,
      });
})

export const DoctorController={
    updateDoctor,
    getAllDoctor
}