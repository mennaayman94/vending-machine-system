import { prisma } from "../prisma/client";

export const createCategory = async ({ name }: { name: string }) => {
  console.log("------repository:createCatlog---------");

  try {
    const newcategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return newcategory;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
