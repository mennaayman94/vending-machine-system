import { body } from "express-validator";

export const addRoleSchema = () => {
    return [
      body("name")
        .isString()
        .notEmpty().isIn(["Admin","Buyer"]).withMessage("invalid name")
    ];
  };