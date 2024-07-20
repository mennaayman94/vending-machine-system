import { createUser, getUserById, loginUser } from "../repositories/user.Repo";
import { UserInput } from "../utils/types/User";

export const CreateUserService = async ({
  email,
  password,
  roleId,
}: Omit<UserInput, "id">) => {
  console.log("------service:CreateUserService---------");

  try {
    return await createUser({ email, password, roleId });
  } catch (err) {
    throw err;
  }
};
export const loginUserService = async ({
  email,
}: Omit<UserInput, "roleId" | "id" | "password">): Promise<UserInput> => {
  console.log("------service:loginUserService---------");

  try {
    return await loginUser({ email });
  } catch (err) {
    throw err;
  }
};
export const findUserById = async (id: string): Promise<UserInput> => {
  console.log("------service:findUserById---------");

  try {
    return (await getUserById(id)) as UserInput;
  } catch (err) {
    throw err;
  }
};
