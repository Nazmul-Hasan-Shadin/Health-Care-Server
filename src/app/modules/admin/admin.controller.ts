import express, { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.const";



const getAllFromDb = async (req: Request, res: Response) => {
  try {
   
     const filters= pick(req.query, adminFilterableField);
     const options= pick(req.query,['limit','page'])
     console.log(options);
     
    const result = await AdminServices.getAllFromDb(filters,options);
    res.status(200).json({
      success: true,
      message: "sadmin data",
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

export const AdminController = {
  getAllFromDb,
};
