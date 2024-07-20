import { body } from "express-validator";

export const reportFilterScheme = () => [
    body("dateTo").optional().isISO8601().withMessage("invalid date"),
    body("dateFrom").optional().isISO8601().withMessage("invalid date"),
    body("itemId").optional().isUUID().withMessage("Invalid item ID"),
    body("categoryId").optional().isUUID().withMessage("Invalid category ID"),
  ];