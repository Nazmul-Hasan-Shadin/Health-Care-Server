import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableField } from "./admin.const";
import { paginationHelper } from "../../../helpers/paginationHeper";
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



const getAllFromDb = async (params: any, options: any) => {
  const { limit, page,skip } = paginationHelper.calculatePagination(options);
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
    skip,
    take:limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });
  return result;
};

export const AdminServices = {
  getAllFromDb,
};
