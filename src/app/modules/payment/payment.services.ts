import axios from 'axios'
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { SslServices } from '../ssl/ssl.service';
const initPayment=async(appointmentId:string)=>{
    const paymentData=await prisma.payment.findFirstOrThrow({
        where:{
            appointmentId
        },
        include:{
            appointment:{
                include:{
                    patient:true
                }
            }
        }
    })
   
    const initPaymentData={
        amount:paymentData.amount,
        transactionId:paymentData.transactionId,
        name:paymentData.appointment.patient.name,
        email:paymentData.appointment.patient.email,
        address:paymentData.appointment.patient.address,
        phoneNumber:paymentData.appointment.patient.contactNumber
    }

    const result=await SslServices.initPayment(initPaymentData)
     return {
        paymentUrl:result.GatewayPageURL
     };
    
}


const validatePayment=async(payload:any)=>{
    if(!payload || payload.status || !(payload.status==='VALID')){
        return {
            message:"invalid payment"
        }
    }

    
  const response=await SslServices.validatePayment(payload)

  if (response.status==='VALID') {
    return {
        message:" payment FAILED"
    }
  }

    await prisma.$transaction(async(tx)=>{
         await tx.payment.updateMany({
            where:{
                transactionId:response.tran_id
            },
            data:{
               status:'PAID',
               paymentGatewayData:response
            }
         })
    })
}

export const PaymentServices={
    initPayment,validatePayment
}