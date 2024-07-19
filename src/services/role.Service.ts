import { getRoleById } from "../repositories/role.Repo";
import { Role } from "../utils/types/Role";

export const findRoleById= async (id:string):Promise<Role>=>{
    console.log("------service:findRoleById---------")

    try {
        return await getRoleById(id);
        } catch (err) {
        throw err
        }
    
}