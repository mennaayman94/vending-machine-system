import { prisma } from "../prisma/client";

export const getRoleById=async(id:string)=>{
    console.log("------repository:getRoleById---------")

    try {
    return  await prisma.role.findUnique({ where: { id:id } });
    } catch (error) {
      console.error("Error while getting role", error);
      throw error;
    }
  }