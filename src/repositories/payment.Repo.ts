import { prisma } from "../prisma/client";
import { Payment } from "../utils/payment";

export const createPayment = async ({ totalSum, paymentId }: Payment) => {
  console.log("------repository:createPurchase---------");

  try {
    const payment = await prisma.payment.create({
      data: {
        totalSum,
        paymentId,
      },
    });
    return payment;
  } catch (error) {
    console.error("Error while creating paymnet", error);
    throw error;
  }
};
