import { prisma } from "../prisma/client";

export const getRoleById = async (id: string) => {
  console.log("------repository:getRoleById---------");

  try {
    return await prisma.role.findUnique({ where: { id: id } });
  } catch (error) {
    console.error("Error while getting role", error);
    throw error;
  }
};
export const createRole = async ({ name }: { name: string }) => {
  console.log("------repository:createRole---------");

  try {
    const newRole = await prisma.role.create({
      data: {
        name,
      },
    });
    return newRole;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};
