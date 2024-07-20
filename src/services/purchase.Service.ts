import { createPurchase } from "../repositories/purchases.Repo";
import { Purchase } from "../utils/types/Purchase";

export const CreatePurchaseService = async ({
  totalCost,
  itemId,
  quantity,
  paymentId,
  categoryId,
  createdAt,
}: Purchase) => {
  console.log("------service:CreatePurchaseService---------");

  try {
    return await createPurchase({
      totalCost,
      itemId,
      quantity,
      paymentId,
      categoryId,
      createdAt,
    });
  } catch (err) {
    throw err;
  }
};
