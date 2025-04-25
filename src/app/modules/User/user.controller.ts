import { NextFunction, Request, Response } from "express";
import { userService } from "./user.services";
import catchAsync from "../../../helpers/catchAsync";
import sendResponse from "../../../helpers/sendResponse";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin created succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.createDoctor(req);
    res.status(200).json({
      success: true,
      message: "Doctor created succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.createPatient(req);
    res.status(200).json({
      success: true,
      message: "Patient created succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const getallUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser(req.query);

  sendResponse(res, {
    
    success: true,
    statusCode:200,
    message: "All Patient retrieves successful",
    data: result,

  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getallUser,
};
