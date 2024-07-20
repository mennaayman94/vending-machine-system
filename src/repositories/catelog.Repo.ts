import { prisma } from "../prisma/client";

export const createCatlog= async ({name }:{name:string}) => {
    console.log("------repository:createCatlog---------")
  
    try {
      const newcatelog = await prisma.catalog.create({
        data: {
        name
        },
      });
      return newcatelog;
    } catch (error) {
      console.error("Error creating catelog:", error);
      throw error;
    }
  };