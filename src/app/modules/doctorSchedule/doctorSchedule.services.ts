import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHeper";
import prisma from "../../../shared/prisma";
import { IAuthUsers } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import AppError from "../../errors/AppErrors";

const createDoctorScheduleIntoDb = async (
  user: any,
  payload: {
    scheduleIds: string[];
  }
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  const result = await prisma.doctorSchedule.createMany({
    data: doctorScheduleData,
  });
  return result;
};

const getMySchedule = async (
  filters: any,
  options: IPaginationOptions,
  user: IAuthUsers
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;
  const andCondition = [];

  if (startDate && endDate) {
    andCondition.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  //=====for exact search like email contactnumber here i use it

  if (Object.keys(filterData).length > 0) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }

    andCondition.push({
      AND: Object.keys(filterData).map((filed) => ({
        [filed]: {
          equals: (filterData as any)[filed],
        },
      })),
    });
  }

  const whereConditions: Prisma.DoctorScheduleWhereInput = {
    AND: andCondition,
  };

  const result = await prisma.doctorSchedule.findMany({
    where: whereConditions,

    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });
  const total = await prisma.doctorSchedule.count({
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

const deleteFromDb=async(user:IAuthUsers,scheduleId:string)=>{
     
    const doctorData=await prisma.doctor.findUniqueOrThrow({
        where:{
            email:user.email
        }
    })

    const isBookedSchedule=await prisma.doctorSchedule.findFirst({
        where:{
     
                doctorId:doctorData.id,
                scheduleId:scheduleId,
                isBooked:true
                
            },
           
        
    })

    if (isBookedSchedule) {
        throw new AppError(503,'You cannot delete the schedule because of this schedule already booked')
    }

    const result=await prisma.doctorSchedule.delete({
        where:{
            doctorId_scheduleId:{
                doctorId:doctorData.id,
                scheduleId:scheduleId
            }
        }
    })

    return result

}

export const DoctorScheduleServices = {
  createDoctorScheduleIntoDb,
  getMySchedule,
  deleteFromDb
};
