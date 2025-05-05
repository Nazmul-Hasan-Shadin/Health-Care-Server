import config from "../../../config";
import prisma from "../../../shared/prisma";

import axios from 'axios'
import AppError from "../../errors/AppErrors";
const initPayment=async(paymentData:any)=>{

try {
    const data = {
        store_id:config.ssl.store_id,
        store_passwd:config.ssl.store_password,
        total_amount: paymentData.amount,
        currency: 'BDT',
        tran_id: paymentData.transactionId, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'N/a',
        product_name: 'Appointment',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: paymentData.name,
        cus_email: paymentData.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.phoneNumber,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

   const response=await axios({
    method:'post',
    url:config.ssl.sslPaymentApi,
    data:data,
    headers:{'Content-Type':'application/x-www-form-urlencoded'}

   })

  return response.data
} catch (error) {
    throw new AppError(500,'payment Error occurred')
}
   
   
    
}
export const SslServices={
    initPayment
}