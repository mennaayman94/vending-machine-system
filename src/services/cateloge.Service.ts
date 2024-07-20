import { createCatlog } from "../repositories/catelog.Repo";

export const addcatelog= async ({name}:{name:string})=>{
    console.log("------service:addcatelog---------")

    try {
        return await createCatlog({name});
        } catch (err) {
        throw err
        }
    
}