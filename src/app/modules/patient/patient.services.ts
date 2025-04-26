import { Admin, Patient, Prisma, UserStatus } from "@prisma/client";

import prisma from "../../../shared/prisma";

import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHeper";

const getAllFromDb = async (params: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.PatientWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: ["name", "email", "contactNumber"].map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //=====for exact search like email contactnumber here i use it

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((filed) => ({
        [filed]: {
          equals: (filterData as any)[filed],
        },
      })),
    });
  }

  const whereConditions: Prisma.PatientWhereInput = { AND: andCondition };
  const result = await prisma.patient.findMany({
    where: whereConditions,
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });
  const total = await prisma.patient.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string): Promise<Patient | null> => {
  const result = prisma.patient.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  return result;
};
const updateIntoDb = async (
  id: string,
  payload:any,
) => {
  const { patientHealthData, medicalReport, ...patientData } = payload;
 console.log(patientData,'patienrdata');
 
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
   //update patiend data
    const updatePatient = await prisma.patient.update({ 
      where: {
        id: id,
      },
      data: patientData,
    });


    //create or update patient health data
     if (patientHealthData) {
        const healthData= await transactionClient.patientHealthData.upsert({
            where:{
                id:patientInfo.id
            },
            update:patientHealthData,
            create:{...patientHealthData , patientId:id}
            
        })
     }

     if (medicalReport) {
        const report= await transactionClient.medicalReport.create({
           data:{...medicalReport,patientId:patientInfo.id}
            
        })
     }

     const responseResult=await prisma.patient.findUnique({
        where:{
            id:patientInfo.id
        }
     })
     return responseResult;


  });


   
  


};

const deleteINTODB = async (id: string) => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const patientDelete = await transactionClient.patient.delete({
      where: {
        id,
      },
    });
    const userDelete = await transactionClient.user.delete({
      where: {
        email: patientDelete.email,
      },
    });
    return patientDelete;
  });

  return result;
};

const softDeleteFromDb = async (id: string) => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const patientDelete = await transactionClient.patient.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    const userDelete = await transactionClient.user.update({
      where: {
        email: patientDelete.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return patientDelete;
  });

  return result;
};

export const PatientServices = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteINTODB,
  softDeleteFromDb,
};
