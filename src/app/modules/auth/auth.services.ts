import bcrypt from "bcrypt";
import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";

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

export const authServices = {
  loginUser,
  refreshToken,
};
