import { body, param } from "express-validator";

export const addItemSchema = () => {
  return [
    body("name")
      .isString()
      .isLength({ min: 5, max: 255 })
      .withMessage("Invalid name value"),
    body("quantity").isInt({min: 1}).withMessage("Invalid quantity value"),
    body("catalogId").isUUID().withMessage("Invalid catalogId value"),
    body("categoryId").isUUID().withMessage("Invalid categoryId value"),
    body("price").isFloat({min: 0}).withMessage("Invalid price value"),
  ];
};

export const updateItemValidationRules = () => [
    param("id").isUUID().withMessage("Invalid item ID"),
    body("name").optional().isString().isLength({ min: 1, max: 255 }).withMessage("Invalid name value"),
    body("catalogId").optional().isUUID().withMessage("Invalid catalog ID"),
    body("categoryId").optional().isUUID().withMessage("Invalid category ID"),
    body("quantity").optional().isInt().withMessage("Invalid quantity value"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Invalid price value"),
  ];

export const findItemsValidationRules = () => [
    body("page").isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    body("pageSize").isInt({ min: 1 }).withMessage("Page size must be a positive integer"),
    body("minPrice").optional().isFloat({ min: 0 }).withMessage("Min price must be a non-negative number"),
    body("maxPrice").optional().isFloat({ min: 0 }).withMessage("Max price must be a non-negative number"),
    body("catalogId").optional().isUUID().withMessage("Invalid catalog ID"),
    body("categoryId").optional().isUUID().withMessage("Invalid category ID"),
  ];

export const ItemIdValidationRules = () => [
    param("id").isUUID().withMessage("Invalid item ID"),
  ];
 