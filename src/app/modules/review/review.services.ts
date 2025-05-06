import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { date } from "zod";
import { addHours, addMinutes, format } from "date-fns";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHeper";

import { IAuthUsers } from "../../interfaces/common";
import app from "../../../app";
import AppError from "../../errors/AppErrors";

const createReview = async (user: IAuthUsers, payload: any) => {

    const patientData= await prisma.patient.findUniqueOrThrow({
        where:{
            email:user?.email
        }
    })
  
     
  const appointmentData=await prisma.appointment.findUniqueOrThrow({
    where:{
        id:payload.appointmentId
    }
  })

  if (!(patientData.id===appointmentData.patientId)) {
        
    throw new AppError(503,'this is not your appointment id')
  }
   
   return await prisma.$transaction(async(tx)=>{
     
   const result=await tx.review.create({
    data:{
     appointmentId:appointmentData.id,
     doctorId:appointmentData.doctorId,
     patientId:appointmentData.patientId,
     comment:payload.comment,
     rating:payload.rating
    }
})
 
 const averageRating=await tx.review.aggregate({
    _avg:{
        rating:true
    }
 })
   await tx.doctor.update({
    where   :{
        id:result.doctorId
    },
    data:{
        averageRating:averageRating._avg.rating
    }
   })

   return result 

  })


};

export const ReviewServices = {
  createReview,
};
  