import { fileUploader } from './../../../helpers/fileUploader';
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin = async (req: any) => {
  //  console.log(req.body);
   
    const file=req.file;
  if (file) {
    const uploadToCloudinary=await fileUploader.uploadToCloudinary(req.file)
    req.body.admin.profilePhoto=uploadToCloudinary?.secure_url
    console.log(uploadToCloudinary,'jjkjkjk');
    
  }

  console.log(req.body,'knjjjj');
  
   
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });

  return result;
};
export const userService = {
  createAdmin,
};
