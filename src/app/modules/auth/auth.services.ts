import  bcrypt from 'bcrypt';
import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import jwt from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelpers';



const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status:UserStatus.ACTIVE
    },
  });
  const isCorrectPassword=await bcrypt.compare(payload.password,userData.password)
  if (!isCorrectPassword) {
    throw new Error("password is incorrect")
  }
  const  accessToken=jwtHelpers.generateToken({
   email:userData.email,
   role:userData.role
  },'privatekey','5m')


  const  refreshToken=jwtHelpers.generateToken({
    email:userData.email,
    role:userData.role
   },'bangladesh','30d')
  
  return {
    accessToken,
    refreshToken,
    needPasswordChange:userData.needPasswordChange
  }
};




export const authServices = {
  loginUser,
};
