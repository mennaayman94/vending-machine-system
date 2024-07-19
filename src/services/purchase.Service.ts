import { createPurchase } from "../repositories/purchases.Repo";
import { Purchase } from "../utils/types/Purchase";

export const CreateItemService = async({ totalSum,items }:Omit<Purchase,"id">) => {
    console.log("------service:CreateItemService---------")

    try {
    return await createPurchase({ totalSum,items });
    } catch (err) {
    throw err
    }
}