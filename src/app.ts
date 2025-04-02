import express, { Request, Response, urlencoded } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/User/user.route';

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
     origin:'*'
}))

app.get('/',(req:Request,res:Response)=>{
    res.send('app is listening at 3000')
})
app.use('/api/v1',UserRoutes)
export default app