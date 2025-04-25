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
const createDoctor = async (req: any) => {
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
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const createDoctorDaata = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return createDoctorDaata;
  });

  return result;
};

const createPatient = async (req: any) => {
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
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const createPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });
    return createPatientData;
  });

  return result;
};



const getAllUser=async(params:Record<string,any>)=>{

  const {searchTerm,...filterData}=params;
  const andCondition=[]
   


  if (searchTerm) {
     andCondition.push({
      OR:['email'].map((field=>({
        [field]:{
          contains:params.searchTerm,
          mode:'insensitive'
        }
        
    })))
      
    })
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      AND:Object.keys(filterData).map(field=>({
        [field]:{
          equals:filterData[field]
        }
      }))
    })
  }


  const filterAndCondition={AND:andCondition}

  const result=await prisma.user.findMany({
    where:filterAndCondition
  })
  
  const totalCount=await prisma.user.count({
    where:filterAndCondition
  })

 return {
   meta:{
    total:totalCount
   },
   data:result
 }


}
export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser
};
