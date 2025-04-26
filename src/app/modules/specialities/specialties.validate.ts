import { title } from "process";
import { z } from "zod";

const createSpecialties=z.object({
    title:z.string({
        required_error:"string is required"
    })
})

export const SpecialtiesValidation={
    createSpecialties
}