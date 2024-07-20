import { body } from "express-validator";
import { Role } from "../utils/enums/Roles";

export const addRoleSchema = () => {
    return [
      body("name")
        .isString()
        .notEmpty().isIn([Role.admin,Role.buyer]).withMessage("invalid name")
    ];
  };