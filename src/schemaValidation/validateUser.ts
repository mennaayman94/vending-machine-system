import { body } from "express-validator";

export const loginSchema = () => {
  return [
    body("email").isEmail().withMessage("invalid email format"),
    body("password").isStrongPassword(),
  ];
};
export const verifyOTPSchema = () => {
  return [
    body("otp")
      .isString().notEmpty()
      .isLength({ min: 6, max: 6 })
      .withMessage("invalid otp"),
  ];
};
export const registerUserSchema = () => {
  return [
    body("email").notEmpty().isEmail().withMessage("invalid email format"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
      body("email").isString().notEmpty().withMessage("invalid roleId")
  ];
};
