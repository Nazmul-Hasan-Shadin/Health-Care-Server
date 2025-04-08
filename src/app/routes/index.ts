import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { adminRoutes } from '../modules/admin/admin.route'

const router=express.Router()

const moduleRoutes=[
{
    path:'/user',
    routes : UserRoutes,
},
{
    path:'/admin',
    routes:adminRoutes
}
]


moduleRoutes.forEach(route=>router.use(route.path,route.routes))

export default router