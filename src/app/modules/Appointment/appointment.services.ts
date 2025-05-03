import prisma from "../../../shared/prisma"
import { IAuthUsers } from "../../interfaces/common"
import { v4 as uuidv4 } from 'uuid';
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHeper";
import { Prisma, UserRole } from "@prisma/client";

const createAppointmentIntoDb=async(user:IAuthUsers,payload:any)=>{
    
    const patientInfo=await prisma.patient.findUniqueOrThrow({
        where:{
            email:user.email
        }
    }) 
   const doctorData=await prisma.doctor.findUniqueOrThrow({
    where:{
        id:payload.doctorId
    }
   })

   const doctorScheduleData=await prisma.doctorSchedule.findFirst({
    where:{
        doctorId:doctorData.id,
        scheduleId:payload.scheduleId,
        isBooked:false
    }
   })

   const videoCallingId= uuidv4()

   const result=await prisma.$transaction(async(tx)=>{
    const appointmentData= await tx.appointment.create({
        data:{
            patientId:patientInfo.id,
            doctorId:doctorData.id,
            scheduleId:payload.scheduleId,
            videoCallingId
        },
        include:{
            patient:true,
            doctor:true,
            schedule:true 
        }
       })


       await tx.doctorSchedule.update({
        where:{
            doctorId_scheduleId:{
                doctorId:doctorData.id,
                scheduleId:payload.scheduleId
            },
     
        },
        data:{
            isBooked:true,
            appointmentId:appointmentData.id
        }
       })
 
      
       const today=new Date();


   const transactionId='HEALTH-CARE'+today.getFullYear() +"-"+today.getMonth()+today.getDay()+'-'+today.getHours()+"-"+today.getMinutes()
       await tx.payment.create({
        data:{
            appointmentId:appointmentData.id,
            amount:doctorData.appointmentFee,
            transactionId:transactionId
        }
       })

       return appointmentData
   })

    return result

}

const getMyAppointment=async(user:IAuthUsers,filters:any,options:IPaginationOptions)=>{
      
    const {limit,page,skip}=paginationHelper.calculatePagination(options)
    const {...filterData}=filters

    const andCondition:Prisma.AppointmentWhereInput[]=[]

       if (user.role===UserRole.PATIENT) {
        andCondition.push({
            patient:{
                email:user.email
            }
         })
       } else if(user?.role===UserRole.DOCTOR){
        andCondition.push({
            doctor:{
                email:user.email
            }
         })
       }
    if (Object.keys(filterData).length>0) {
         const filterConditions=Object.keys(filterData).map(key=>({
            [key]:{
                equals:filterData[key]
            }
         }))

         andCondition.push(...filterConditions)
    }

    const whereCondition:Prisma.AppointmentWhereInput=andCondition.length>0 ? {AND:andCondition}:{}
     
    const result= await prisma.appointment.findMany({
        where:whereCondition,
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ?{[options.sortBy]:options.sortOrder}:{createdAt:'desc'},
        include :user?.role===UserRole.PATIENT
         ? {doctor:true,schedule:true}:{patient:{
            include:{
                medicalReport:true,
                patientHealthData:true
            }
         },schedule:true,}
    })

    const total= await prisma.appointment.count({
        where:whereCondition
    })

    return {
        meta:{
            total,
            page,
            limit

        },
        data:result
    }

}

export const AppointmentServices={
    createAppointmentIntoDb,
    getMyAppointment
}