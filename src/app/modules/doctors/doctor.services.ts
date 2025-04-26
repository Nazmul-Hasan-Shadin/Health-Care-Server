import catchAsync from "../../../helpers/catchAsync";
import prisma from "../../../shared/prisma";

const updateDoctorFromDb = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

 await prisma.$transaction(async (transactionClient) => {
    const updatedDoctorData = await prisma.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });
    
    if (specialties && specialties.length >0){
        const deleteSpecialtiesIds=specialties.filter(specialty=>specialty.isDeleted)

        for (const specialty of deleteSpecialtiesIds) {
            //======delete specialties=======
            const deleteSpecialtiesId =
              await transactionClient.doctorSpecialties.deleteMany({
            where:{
                doctorId:doctorInfo.id,
                specialtiesId:specialty.specialtiesId
            }
              });
          }
    }

    //============create doctor specialties =====

    const createSpecialtiesId=specialties.filter(specialty=>!specialty.isDeleted)

    for (const specialty of createSpecialtiesId) {
     
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
    }

  });
 const result =await prisma.doctor.findUnique({
    where:{
         id:doctorInfo.id
    },
    include:{
        doctorSpecialties:{
            include:{
                specialty:true
            }
        }
    }
 })

 return result
};

export const DoctorServices = {
  updateDoctorFromDb,
};
