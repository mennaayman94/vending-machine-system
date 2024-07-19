import { error } from "console";
import { prisma, PrismaClient } from "../prisma/client";
import { Purchase } from "../utils/types/Purchase";

export const createPurchase = async ({ totalSum, items }: Purchase) => {
    console.log("------repository:createPurchase---------")

  try {
    const purhase = await prisma.purchase.create({
      data: {
        items,
        totalSum,
      },
    });
    return purhase;
  } catch (error) {
    console.error("Error while getting role", error);
    throw error;
  }
};

export const checkInventoryAndUpdate = async (
  items: any,
  itemsHashMap: any,
  totalSum: number
) => {
    console.log("------repository:checkInventoryAndUpdate---------")

  try {
    const transaction = await prisma.$transaction(async (tx: PrismaClient) => {
      const transactionsItems = await tx.item.findMany({
        where: {
          id: {
            in: items.map((item: {itemId:string, quantity:number}) => item.itemId),
          },
        },
      });
      console.log(transactionsItems);
      for (let i = 0; i < transactionsItems.length; i++) {
        if (itemsHashMap[transactionsItems[i].id]) {
          if (
            itemsHashMap[transactionsItems[i].id] >
            transactionsItems[i].quantity
          ) {
            throw new Error(
              `quantity of ${transactionsItems[i].name} is unavailable`
            );
          }
          try {
            const result = await tx.item.updateMany({
              where: {
                id: transactionsItems[i].id,
              },
              data: {
                quantity:
                  transactionsItems[i].quantity -
                  itemsHashMap[transactionsItems[i].id],
                  outOfStock:transactionsItems[i].quantity -
                  itemsHashMap[transactionsItems[i].id]===0?true:false
              },
            });
          } catch (error) {
            throw new Error(`something went wrong`);
          }
          totalSum +=
            itemsHashMap[transactionsItems[i].id] * transactionsItems[i].price;
        }
      }
      const itemsIds = items.map((item: {itemId:string, quantity:number}) => item.itemId).join(",");
      await createPurchase({ totalSum, items: itemsIds });
      return items;
    });
    return {transaction,sum:totalSum};
  } catch (error) {
    console.error("Error while transaction", error);
    throw error;
  }
};
