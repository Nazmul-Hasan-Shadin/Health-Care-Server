import prisma from "../../../shared/prisma"
import AppError from "../../errors/AppErrors"
import { IAuthUsers } from "../../interfaces/common"


const createPrescription=async(user:IAuthUsers,payload:any)=>{
      const appointmentData=await prisma.appointment.findUnique({
        where:{
            id:payload.appointmentId,
            paymentStatus:'PAID'
        },
        include:{
            doctor:true
        }
      })
      console.log(user.email,appointmentData?.doctor.email);
      
      if (!(user.email=== appointmentData?.doctor.email)) {
         throw new AppError(503,'you are forbidden')
      }
   const result= await  prisma.prescription.create({
    data:{
        appointmentId:appointmentData.id,
        doctorId:appointmentData.doctorId,
        patientId:appointmentData.patientId,
        instructions:payload.instruction
    },
    include:{
        patient:true
    }
   })

   return result

}

const getMyPrescription=async(user:IAuthUsers)=>{
     
    const result= await prisma.prescription.findMany({
      where:{
        patient:{
            email:user.email
        }
      }
    })

    return result
}
export const  PrescriptionServices={
    createPrescription,
    getMyPrescription
}