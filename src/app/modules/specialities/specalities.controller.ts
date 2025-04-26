import catchAsync from "../../../helpers/catchAsync";
import { fileUploader } from "../../../helpers/fileUploader";
import sendResponse from "../../../helpers/sendResponse";
import { SpecialtiesService } from "./specialities.services";

const createSpecialist = catchAsync(async (req, res) => {
  const result = await SpecialtiesService.createSpecialistIntoDb(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Specialist has created",
    data: result,
  });
});

const getAllSpecialties = catchAsync(async (req, res) => {
    const result = await SpecialtiesService.getAllSpecialtiesFromDDb();
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Specialties Retrieved successful",
      data: result,
    });
  });
  const deleteSpecialties = catchAsync(async (req, res) => {
    const result = await SpecialtiesService.deleteSpecialtiesFromDb(req.params.id);
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Specialist has deleted",
      data: result,
    });
  });
export const SpecialistController = {
  createSpecialist,
  getAllSpecialties,
  deleteSpecialties
};
