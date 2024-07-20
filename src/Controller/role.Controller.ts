import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { addRole } from "../services/role.Service";

// add new role
export const createRole = async (req: Request|any, res: Response) => {
    console.log("------controller:createRole---------")
    try {
      
      // check if there any validation errors
      const validationErrors = validationResult(req);
  
      if (!validationErrors.isEmpty()) {
        return res.status(422).json({ message: validationErrors.array()[0].msg });
      }
  
      const { name } = req.body;
  
      // create new item
      const item = await addRole({
        name,
      });
      res.status(201).json({ ...item });
    } catch (error) {
      res
        .status(400)
        .json({ error: "something went wrong in role creation", message: error });
    }
  };