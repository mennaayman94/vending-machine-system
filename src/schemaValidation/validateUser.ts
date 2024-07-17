
import { body } from 'express-validator';
export const loginSchema = [body('email').isEmail().withMessage("invalid email format"), body('password')];
export const verifyOTPSchema = [body('otp').isNumeric().isLength({min:6,max:6})];
export const registerUserSchema = [
  body('email').isEmail().withMessage("invalid email format"),
  body('password').isStrongPassword().withMessage('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character')
];