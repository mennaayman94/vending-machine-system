/// array of items--->> promise all
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import {
  checkInventoryAndUpdate,
} from "../repositories/purchases.Repo";
export const pusrchaseItems = async (
  req: Request | any,
  res: Response,
) => {
  console.log("------controller:pusrchaseItems---------")

  try {
    if (req.roleName !== "Buyer") {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }
    const { cash, items } = req.body;
    const itemsHashMap: any = {};
    let totalSum = 0;
    items.forEach((item: {itemId:string,quantity:number}) => {
      itemsHashMap[item.itemId] = item.quantity;
    });
   
    const { transaction, sum } = await checkInventoryAndUpdate(
      items,
      itemsHashMap,
      totalSum
    );
    if (sum > cash) {
      return res.status(200).json({ messgae: "insufficient amount" });
    }
    if (sum === cash) {
      return res.status(200).json({ messgae: "your purchase is successed" });
    }
    if (cash > sum) {
      return res
        .status(200)
        .json({ messgae: "your purchase is successed", change: cash - sum });
    }

    return transaction;
  } catch (error:any) {
    res.status(400).json({
      error: error.message,
      message: error,
    });
  }
};
