import express, { Request, Response } from 'express'
import cors from 'cors'

const app=express();
app.use(express.json())
app.use(cors({
     origin:'*'
}))

app.get('/',(req:Request,res:Response)=>{
    res.send('app is listening at 3000')
})
export default app