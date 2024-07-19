import { PrismaClient } from "@prisma/client";
import { UserInput } from "../utils/types/User";
import { hashPassword } from "../utils/password";

const prisma = new PrismaClient();

export const createUser = async ({ email, password, roleId }: Omit<UserInput,"id">) => {
  console.log("------repository:createUser---------")

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        roleId,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
export const getUserByEmail = async ({
  email,
}: Omit<UserInput, "password" | "roleId" | "id">) => {
  console.log("------repository:getUserByEmail---------")

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error getting email:", error);
    throw error;
  }
};
export const loginUser = async ({
  email,
}: Omit<UserInput, "roleId"|"password"|"id">) => {
  console.log("------repository:loginUser---------")

  try {
    const user = await getUserByEmail({ email });
    if (!user) {
      throw new Error("unvalid Credentials");
    }
    return  user as UserInput;

  } catch (error) {
    console.error("Error while logging", error);
    throw error;
  }
};
export const getUserById=async(id:string)=>{
  console.log("------repository:getUserById---------")

  try {
  return  await prisma.user.findUnique({ where: { id:id } });
  } catch (error) {
    console.error("Error while getting user", error);
    throw error;
  }
}