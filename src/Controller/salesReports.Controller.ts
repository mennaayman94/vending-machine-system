import { Request, Response } from "express";
import { getReports } from "../services/salesReports.Service";
import { validationResult } from "express-validator";
import { Role } from "../utils/enums/Roles";

export const salesReportsController = async (
  req: Request | any,
  res: Response
) => {
  console.log("------controller:salesReportsController---------");

  try {
    if (req.roleName !== Role.admin) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // Check if there are any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const validParams = ["itemId", "categoryId", "dateFrom", "dateTo"];
    const filterParams: any = {};

    validParams.forEach((param) => {
      if (req.body[param] !== undefined) {
        filterParams[param] = req.body[param];
      }
    });

    // Call the service function with the filtered parameters
    const report = await getReports(filterParams);

    res
      .status(200)
      .json({
        salesQuantity: report.totalSalesQuantity,
        totalSales: report.totalSales,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Something went wrong in getting reports",
        message: error,
      });
  }
};
