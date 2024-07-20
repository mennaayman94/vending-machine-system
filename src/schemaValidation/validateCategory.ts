import { body } from "express-validator";

export const addCategorySchema = () => {
    return [
      body("name")
        .isString()
        .notEmpty().withMessage("invalid name")
    ];
  };