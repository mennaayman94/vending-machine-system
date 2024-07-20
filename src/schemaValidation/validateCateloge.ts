import { body } from "express-validator";

export const addCatelogSchema = () => {
    return [
      body("name")
        .isString()
        .notEmpty().withMessage("invalid name")
    ];
  };