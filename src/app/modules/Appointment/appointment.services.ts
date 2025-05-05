import prisma from "../../../shared/prisma"
import { IAuthUsers } from "../../interfaces/common"
import { v4 as uuidv4 } from 'uuid';
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHeper";
import { AppointmentStatus, PaymentStatus, Prisma, UserRole } from "@prisma/client";
import AppError from "../../errors/AppErrors";

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

const changeAppointmentStatus=async(appointmentId:string,status:AppointmentStatus,user:IAuthUsers)=>{
     const appointmentData=await prisma.appointment.findUniqueOrThrow({
        where:{
            id:appointmentId    
        },
        include:{
            doctor:true
        }
     })
     
     if (user.role==='DOCTOR') {
        if (!(user.email===appointmentData.doctor.email)) {
            throw new AppError(503,'This is not your appointment')
        }
     }

     const result=await prisma.appointment.update({
        where:{
            id:appointmentId
        },

        data:{
            status
        }
     })

     return result
}

const cancelUnpaidAppointment=async()=>{
   const thirtyMinuteAgo=new Date(Date.now()-30 * 60*1000)
   console.log(thirtyMinuteAgo);
   const unPaidAppointments=await prisma.appointment.findMany({
    where:{
        createdAt:{
            lte:thirtyMinuteAgo
        },
        paymentStatus:PaymentStatus.UNPAID
    }
   })
   console.log(unPaidAppointments);
   const appointmentIdToCancel=unPaidAppointments.map(appointment=>appointment.id)
   await prisma.$transaction(async(tx)=>{
    await tx.payment.deleteMany({
        where:{
            appointmentId:{
                in:appointmentIdToCancel
            }
        }
    })

    await tx.appointment.deleteMany({
        where:{
            id:{
                in:appointmentIdToCancel
            }
        }
    })
  
  
     for(const unpaidAppointment of unPaidAppointments){
        await tx.doctorSchedule.updateMany({
            where:{
              doctorId:unpaidAppointment.doctorId,
              scheduleId:unpaidAppointment.scheduleId
            },
            data:{
                isBooked:false
            }
        })
     }


   })
   
}

export const AppointmentServices={
    createAppointmentIntoDb,
    getMyAppointment,
    changeAppointmentStatus,
    cancelUnpaidAppointment
}