import { error } from "console";
import { prisma, PrismaClient } from "../prisma/client";
import { Purchase } from "../utils/types/Purchase";
import { v4 as uuidv4 } from 'uuid';
import { createPayment } from "./payment.Repo";
import { Certificate } from "crypto";
export const createPurchase = async ({createdAt, totalCost,quantity,itemId, paymentId,categoryId }: Purchase) => {
    console.log("------repository:createPurchase---------")

  try {
    const purhase = await prisma.purchase.create({
      data: {
        totalCost,
        quantity,
        itemId,
        paymentId, categoryId, createdAt
      },
    });
    return purhase;
  } catch (error) {
    console.error("Error while creating paurchase", error);
    throw error;
  }
};

export const checkInventoryAndUpdate = async (
  items: any,
  itemsHashMap: any,
  totalSum: number,
  cash:number
) => {
    console.log("------repository:checkInventoryAndUpdate---------")

  try {
    const paymentId=uuidv4(); 
    const currentDate= new Date()
    currentDate.setUTCHours(0, 0, 0, 0)
    const transaction = await prisma.$transaction(async (tx: PrismaClient) => {
      const transactionsItems = await tx.item.findMany({
        where: {
          id: {
            in: items.map((item: {itemId:string, quantity:number}) => item.itemId),
          },
        },
      });
      console.log(transactionsItems,"item")
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
          totalSum +=
              itemsHashMap[transactionsItems[i].id] * transactionsItems[i].price
        }
      }
      if (totalSum > cash) {
        throw Error ("insufficient amount")
      }else{
        for (let i = 0; i < transactionsItems.length; i++) {
          let totalCost=0;
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
            totalCost=itemsHashMap[transactionsItems[i].id] * transactionsItems[i].price;
            
            await createPurchase({createdAt:currentDate.toISOString(),categoryId:transactionsItems[i].categoryId, totalCost,quantity:itemsHashMap[transactionsItems[i].id],itemId:transactionsItems[i].id,paymentId:paymentId  });
            
          }          
        }
      }
      return items;
    });
    return {transaction,sum:totalSum,paymentId};
  } catch (error) {
    console.error("Error while transaction", error);
    throw error;
  }
};
