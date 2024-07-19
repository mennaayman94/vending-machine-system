import { body } from "express-validator";

export const makePurchaseSchema = () => {
  return [
    body("cash").notEmpty().isFloat({ min: 5 }).withMessage("invalid amount"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Items should be an array with at least one item"),
    body("items.*.itemId").isString().withMessage("Item ID must be a string"),
    body("items.*.quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than zero"),
  ];
};
