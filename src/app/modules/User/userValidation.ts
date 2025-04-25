import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdmin=z.object({
    password:z.string({
        required_error:'password is required'
    }),
    admin:z.object({
        name:z.string({
            required_error:'name is required'
        }),
        email:z.string({
            required_error:'email is requird'
        }),
        contactNumber:z.string({
            required_error:'contact number is required'
        })
    })
})
const createDoctor=z.object({
    password:z.string({
        required_error:'password is required'
    }),
    doctor:z.object({
        name:z.string({
            required_error:'name is required'
        }),
        email:z.string({
            required_error:'email is requird'
        }),
        contactNumber:z.string({
            required_error:'contact number is required'
        }),
        address:z.string().optional(),
        registrationNumber:z.string({
             required_error:'reg number is required'
        }),
        experience:z.string().optional(),
        gender:z.enum([Gender.MALE,Gender.FEMALE]),
        appointmentFee:z.number({
            required_error:"appointment fee is required"
        }),
        qualification:z.string({
            required_error:'qualificaton required'
        }),
        currentWorkingPlace:z.string({
            required_error:'current working place is required'
        }),
        designation:z.string({
            required_error:'designation  is required'
        })

    })
})

const createPatient=z.object({
    password:z.string({
        required_error:'password is required'
    }),
    patient:z.object({
        name:z.string({
            required_error:'name is required'
        }),
        email:z.string({
            required_error:'email is requird'
        }),
        contactNumber:z.string({
            required_error:'contact number is required'
        }),
        address:z.string().optional(),
       

    })
})
export const UserValidation={
    createAdmin,
    createDoctor,
    createPatient
}