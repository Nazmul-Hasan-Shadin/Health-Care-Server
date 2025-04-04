import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableField } from "./admin.const";
// OR:[
//   {
//     name:{
//       contains:params.searchTerm,
//       mode:"insensitive"
//     }
//   },
//   {
//     email:{
//       contains:params.searchTerm,
//       mode:'insensitive'
//     }
//   }
// ]
const prisma = new PrismaClient();
const getAllFromDb = async (params: any,options:any) => {
  const {limit,page}=options
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];
  
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchableField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.log(filterData);

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((filed) => ({
        [filed]: {
          equals: filterData[filed],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip:(Number(page)-1)*Number(limit),
    take:Number(limit)
  });
  return result;
};

export const AdminServices = {
  getAllFromDb,
};
