import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { adminRoutes } from '../modules/admin/admin.route'
import { authRoutes } from '../modules/auth/auth.routes'

const router=express.Router()

const moduleRoutes=[
{
    path:'/user',
    routes : UserRoutes,
},
{
    path:'/admin',
    routes:adminRoutes
},
{
    path:'/auth',
    routes:authRoutes
},

]


moduleRoutes.forEach(route=>router.use(route.path,route.routes))

export default router