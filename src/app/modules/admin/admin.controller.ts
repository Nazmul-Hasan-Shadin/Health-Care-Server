import express, { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.const";
import sendResponse from "../../../helpers/sendResponse";



const getAllFromDb = async (req: Request, res: Response) => {
  try {

    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options, 'iam optoions');

    console.log(options);

    const result = await AdminServices.getAllFromDb(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All admin data retrived',
      meta: result.meta,
      data: result.data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const getByIdFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await AdminServices.getByIdFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All admin data retrived',

      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const updateIntoDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await AdminServices.updateIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'updated',

      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const deleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await AdminServices.deleteINTODB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Deleted',

      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};

const softDeleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await AdminServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'soft deleted',

      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name,
      error: error,
    });
  }
};






export const AdminController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb
};
