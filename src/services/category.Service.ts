import { createCategory } from "../repositories/category.Repo";

export const addCategory= async ({name}:{name:string})=>{
    console.log("------service:addCategory---------")

    try {
        return await createCategory({name});
        } catch (err) {
        throw err
        }
    
}