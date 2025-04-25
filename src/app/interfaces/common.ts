import { UserRole } from "@prisma/client"

export type IAuthUsers= {
    email:string,
    role:UserRole | null
}