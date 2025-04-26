import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchableField } from "./admin.const";
import { paginationHelper } from "../../../helpers/paginationHeper";
import prisma from "../../../shared/prisma";
import { IAdminFiterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";





const getAllFromDb = async (params:IAdminFiterRequest, options:IPaginationOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
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

  //=====for exact search like email contactnumber here i use it 

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((filed) => ({
        [filed]: {
          equals: (filterData as any)[filed],
        },
      })),
    });
  }

  andCondition.push({
    isDeleted: false
  })

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
          [options.sortBy]: options.sortOrder,
        }
        : {
          createdAt: "asc",
        },

  });
  const total = await prisma.admin.count({
    where: whereConditions
  })
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getByIdFromDb = async (id: string): Promise<Admin | null> => {
  const result = prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted: false
    }
  })
  return result
}
const updateIntoDb = async (id: string, data: Partial<Admin>): Promise<Admin> => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false
    }
  })

  const result = await prisma.admin.update({
    where: {
      id: id
    },
    data
  })
  return result
}

const deleteINTODB = async (id: string) => {

  await prisma.admin.findUniqueOrThrow({
    where: {
      id
    }
  })

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDelete = await transactionClient.admin.delete({
      where: {
        id
      }
    })
    const userDelete = await transactionClient.user.delete({
      where: {
        email: adminDelete.email
      }
    })
    return adminDelete
  })

  return result


}

const softDeleteFromDb = async (id: string) => {

  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false
    }
  })

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDelete = await transactionClient.admin.update({
      where: {
        id
      },
      data: {
        isDeleted: true
      }
    })
    const userDelete = await transactionClient.user.update({
      where: {
        email: adminDelete.email
      },
      data: {
        status: UserStatus.DELETED
      }
    })
    return adminDelete
  })

  return result


}

export const AdminServices = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteINTODB,
  softDeleteFromDb
};
