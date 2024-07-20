import { prisma } from "../prisma/client";
import { PurchaseFilter } from "../utils/types/Purchase";

export const getSalesReports = async ({
  dateFrom,
  dateTo,
  categoryId,
  itemId,
}: PurchaseFilter) => {
  console.log("------repository:getReports---------");
  try {
    const whereClause: any = {};
    if (dateFrom !== undefined && dateTo !== undefined) {
      whereClause.createdAt = {
        lte: new Date(dateFrom),
      };
      whereClause.createdAt = {
        gte: new Date(dateFrom),
      };
    }
    if (dateFrom !== undefined && !dateTo) {
      whereClause.createdAt = {
        gte: new Date(dateFrom),
      };
    }
    if (dateTo !== undefined && !dateFrom) {
      whereClause.createdAt = {
        lte: new Date(dateTo),
      };
    }
    if (itemId) {
      whereClause.itemId = itemId;
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    const totalSalesQuantity = await prisma.purchase.aggregate({
      where: whereClause,
      _sum: {
        quantity: true,
      },
    });
    const totalSales = await prisma.purchase.aggregate({
      where: whereClause,
      _sum: {
        totalCost: true,
      },
    });
    return {
      totalSales: totalSales._sum.totalCost,
      totalSalesQuantity: totalSalesQuantity._sum.quantity,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
