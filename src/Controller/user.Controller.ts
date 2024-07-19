import { cookie, validationResult } from "express-validator";
import { CreateUserService, loginUserService } from "../services/user.Service";
import { UserInput } from "../utils/types/User";
import { Request, Response } from "express";
import { comparePassword } from "../utils/password";
import otpGenerator from "otp-generator";
import redisClient from "../redis/clients";
import jwt, { JwtPayload } from "jsonwebtoken";

export const createUserController = async (req: Request, res: Response) => {
  console.log("------controller:createUserController---------")

  try {
    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { email, password, roleId } = req.body as unknown as UserInput;

    // create new item
    const user = await CreateUserService({
      email,
      password,
      roleId,
    });
    res.status(201).json({ ...user });
  } catch (error) {
    res
      .status(400)
      .json({ error: "something went wrong in user creation", message: error });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  console.log("------controller:userLoginController---------")

  try {
    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { email, password } = req.body as unknown as UserInput;

    const user: UserInput = await loginUserService({
      email,
    });
    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      if (!(await redisClient.get(user.id))) {
        const generatedOTP = otpGenerator.generate(6, {
          digits: true,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        await redisClient.setEx(user.id, 300, generatedOTP);
        const token = jwt.sign(
          { id: user.id, roleId:user.roleId },
          process.env.JWT_SECRET as string,
          { expiresIn: "5min" }
        );
        return res
          .cookie("jwt", token, {
            httpOnly: true,
            secure:true
          })
          .status(200)
          .json({ otp: generatedOTP });
      } else {
        return res.status(200).json({ message: "otp already sent" });
      }
    } else {
      return res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "something went wrong in logging user", message: error });
  }
};
export const verifyOTP = async (req: Request, res: Response) => {
  console.log("------controller:verifyOTP---------")

  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }
    const otp = req.body["otp"] as string;
    const result:any = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET as string);
    const storedOtp = await redisClient.get(result.id);
    if (storedOtp && storedOtp === otp) {
      const token = jwt.sign(
        { id: result.id, roleId:result.roleId },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return res
          .cookie("jwt", token, {
            httpOnly: true,
            secure:true
          })
          .status(200)
          .json({ message: "userLoggedin",token});
    } else {
      return res.status(403).json({ message: "Invalid otp" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "something went wrong in logging user", message: error });
  }
 
};
