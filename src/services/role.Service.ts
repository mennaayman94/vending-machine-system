import { createRole, getRoleById } from "../repositories/role.Repo";
import { Role } from "../utils/types/Role";

export const findRoleById= async (id:string):Promise<Role>=>{
    console.log("------service:findRoleById---------")

    try {
        return await getRoleById(id);
        } catch (err) {
        throw err
        }
    
}
export const addRole= async ({name}:{name:string}):Promise<Role>=>{
    console.log("------service:addRole---------")

    try {
        return await createRole({name});
        } catch (err) {
        throw err
        }
    
}