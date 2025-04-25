import { IAuthUsers } from './../../interfaces/common';
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

const changeProfileStatus = catchAsync(async (req, res) => {
  const {id}=req.params
  const result = await userService.changeProfileStatus(id,req.body);

  sendResponse(res, {
    
    success: true,
    statusCode:200,
    message: "User profile status changed",
    data: result,

  });
});


const getMyProfile = catchAsync(async (req, res) => {
  console.log(req.user);
  
  const result = await userService.getMyProfile(req.user);

  sendResponse(res, {
    
    success: true,
    statusCode:200,
    message: "User profile data fetched",
    data: result,

  });
});


const updateMyProfile = catchAsync(async (req:Request & {user?:IAuthUsers}, res:Response) => {
 
   const user=req.user
  const result = await userService.updateMyProfile(user as IAuthUsers,req);

  sendResponse(res, {
    
    success: true,
    statusCode:200,
    message: "My profile updated",
    data: result,

  });
});
export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getallUser,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile
};
