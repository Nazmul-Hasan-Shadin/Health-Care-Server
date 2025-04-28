import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { adminRoutes } from '../modules/admin/admin.route'
import { authRoutes } from '../modules/auth/auth.routes'
import { SpecialtiesRoutes } from '../modules/specialities/specialities.route'
import { DoctorRoutes } from '../modules/doctors/doctor.route'
import { PatientRoutes } from '../modules/patient/patient.route'
import { ScheduleRoutes } from '../modules/schedule/schedule.route'

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
{
    path:'/specialties',
    routes:SpecialtiesRoutes
},
{
    path:'/doctor',
    routes:DoctorRoutes
},
{
    path:'/patient',
    routes:PatientRoutes
},
{
    path:'/schedule',
    routes:ScheduleRoutes
},

]


moduleRoutes.forEach(route=>router.use(route.path,route.routes))

export default router