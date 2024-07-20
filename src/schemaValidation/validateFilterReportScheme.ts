import { body } from "express-validator";

export const reportFilterScheme = () => [
  ///2023-07-20 is the accepted format for the date
    body("dateTo").optional().isISO8601().withMessage("invalid date"),
    body("dateFrom").optional().isISO8601().withMessage("invalid date"),
    body("itemId").optional().isUUID().withMessage("Invalid item ID"),
    body("categoryId").optional().isUUID().withMessage("Invalid category ID"),
  ];