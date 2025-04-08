import express, { NextFunction, request, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/User/user.route';
import { adminRoutes } from './app/modules/admin/admin.route';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser'

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
     origin:'*'
}))

app.use(cookieParser())
app.get('/',(req:Request,res:Response)=>{
    res.send('app is listening at 3000')
})

app.use('/api/v1',router)

app.use(globalErrorHandler)
app.use((req:Request,res:Response,next:NextFunction)=>{
 res.status(404).json({
    success:false,
    message:'Route not found',
    error:{
        path:req.originalUrl,
        message:'your requested route not found'
    }
 })
})

export default app