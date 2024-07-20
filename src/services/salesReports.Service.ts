import { getSalesReports } from "../repositories/salesReports.Repo";
import { PurchaseFilter } from "../utils/types/Purchase";

export const getReports = async ({
  dateFrom,
  dateTo,
  categoryId,
  itemId,
}: PurchaseFilter) => {
  console.log("------service:getReports---------");
  try {
    return await getSalesReports({ dateFrom, dateTo, categoryId, itemId });
  } catch (error) {
    throw error;
  }
};
