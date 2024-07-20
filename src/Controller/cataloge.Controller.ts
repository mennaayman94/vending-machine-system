import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { addcatelog } from "../services/cateloge.Service";

export const createCatelog = async (req: Request | any, res: Response) => {
  console.log("------controller:createCatelog---------");
  try {
    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { name } = req.body;

    const item = await addcatelog({
      name,
    });
    res.status(201).json({ ...item });
  } catch (error) {
    res
      .status(400)
      .json({
        error: "something went wrong in cateloge creation",
        message: error,
      });
  }
};
