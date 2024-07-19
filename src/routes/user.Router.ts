import { createUserController, userLoginController, verifyOTP } from "../Controller/user.Controller";
import { loginSchema, registerUserSchema, verifyOTPSchema } from "../schemaValidation/validateUser";
import express from 'express';
const userRouter = express.Router();


userRouter.post('/register', registerUserSchema() ,createUserController );
userRouter.post('/login', loginSchema() ,userLoginController );
userRouter.post('/verifyOTP', verifyOTPSchema() ,verifyOTP );



export default userRouter;