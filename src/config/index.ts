import dotEnv from 'dotenv'
import path from 'path'

dotEnv.config({path:path.join(process.cwd(),'.env')})


export default {
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    jwt:{
        accessToken:process.env.ACCESS_TOKEN,
        accessToken_Expire:process.env.EXPIRES_IN_ACCESSTOKEN,
        refresh_token_secret:process.env.EXPIRES_IN_REFRESHTOKEN,
        refreshToken_Expire:process.env.EXPIRES_IN_REFRESHTOKEN,
        reset_token_pass:process.env.RESET_PASS_TOKEN,
        reset_token_pass_expirein:process.env.RESET_PASS_TOKEN_EXPIREIN,
        reset_pass_link:process.env.RESET_PASS_URL
    },
     emailSender:{
        email:process.env.EMAIL,
        app_password:process.env.APP_PASSWORD
     },
    ssl:{
        store_id:process.env.STORE_ID,
         store_password:process.env.STORE_PASSWORD,
        sslPaymentApi:process.env.SSL_PAYMENT_API,
        sslValidationApi:process.env.SSL_VALIDATION_API,
        successUrl:process.env.SUCCESS_URL,
        failedUrl:process.env.FAILED_URL
    }

}