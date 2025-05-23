import bcrypt from "bcrypt";
import { User, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import emailSender from "./emailSender";
import AppError from "../../errors/AppErrors";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("password is incorrect");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.accessToken as string,
     config.jwt.accessToken_Expire as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
   config.jwt.refresh_token_secret as string,
   config.jwt.refreshToken_Expire as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData =jwtHelpers.verifyToken(token,config.jwt.refresh_token_secret as  string)
    console.log(decodedData);
  } catch (error) {
    throw new Error("you are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status:UserStatus.ACTIVE
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    config.jwt.accessToken as string,
    config.jwt.accessToken_Expire as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};
const changePassword=async(user:User,payload:any)=>{
    const userData=await prisma.user.findFirstOrThrow({
        where:{
            email:user.email
        }
    })

    const isCorrectPassword = await bcrypt.compare(
        payload.oldPassword,
        userData.password
      );
      if (!isCorrectPassword) {
        throw new Error("password is incorrect");
      }
      const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
      await prisma.user.update({
        where:{
            email:userData.email,
            status:UserStatus.ACTIVE
        },
        data:{
            password:hashedPassword,
            needPasswordChange:false
        }
      })
      return {
        message:'password changed successfully'
      }

   
}

 const forgetPassword=async(payload:{email:string})=>{
     const userData=await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email,
            status:UserStatus.ACTIVE
        }
     })
     const resetPasswordToken=jwtHelpers.generateToken({email:userData.email,role:userData.role},config.jwt.reset_token_pass as string,config.jwt.reset_token_pass_expirein as string)
     console.log(resetPasswordToken,'resetpatoke');

     //https://localhost:3000/reset-pass?email=shadin@gmail.com&token=bdsidrha
     const reset_pass_link=config.jwt.reset_pass_link + `?email=${userData.email}&token=${resetPasswordToken}`
     console.log(reset_pass_link,'resetpasslink');

     await emailSender(userData.email,
        `<div>
       <p> Dear User,your pass reset linki  <a href=${reset_pass_link}>Reset </a> </p>
         </div>`
     )
     
     

 }
 
 const resetPassword=async(token:string,payload:{id:string,password:string})=>{

      console.log(payload.id,'k');
      const userData= await prisma.user.findUniqueOrThrow({
        where:{
            id:payload.id,
            status:UserStatus.ACTIVE
        }
      })
 
      

       const isValidToken=jwtHelpers.verifyToken(token,config.jwt.reset_token_pass as string)
       if (!isValidToken) {
        throw new AppError(501,'forbidden')
       }
       const hasPassword=bcrypt.hash(payload.password,12
       
       )
       const result= await prisma.user.update({
        where:{
            id:payload.id
        },
        data:{
            password:payload.password
        }
       })
      return result
 }

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
};
