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
    }

}