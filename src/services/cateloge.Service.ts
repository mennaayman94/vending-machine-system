import { Catalog } from "@prisma/client";
import { createCatlog } from "../repositories/catelog.Repo";

export const addcatelog= async ({name}:{name:string}):Promise<Catalog>=>{
    console.log("------service:addcatelog---------")

    try {
        return await createCatlog({name});
        } catch (err) {
        throw err
        }
    
}