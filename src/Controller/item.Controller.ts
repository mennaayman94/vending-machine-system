import { Request, Response } from "express";
import { CreateItemService , findItemService , findItemsService , updateItemService ,deleteItemService } from "../services/item.Service";
// validator results
import { validationResult } from "express-validator";

// add new item
export const createItemController = async (req: Request|any, res: Response) => {
  console.log("------controller:createItemController---------")
  try {
    if(req.roleName!=="Admin"){
      return res
      .status(403)
      .json({ message: "You are not authorized" });
    }
    
    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { name, catalogId, categoryId, quantity, price } = req.body;

    // create new item
    const item = await CreateItemService({
      name,
      catalogId,
      categoryId,
      quantity,
      price,
    });
    res.status(201).json({ ...item });
  } catch (error) {
    res
      .status(400)
      .json({ error: "something went wrong in item creation", message: error });
  }
};

// find item by id
export const findItemController = async (req: Request|any, res: Response) => {
  console.log("------controller:findItemController---------")

  try {
    // check if there any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { id } = req.params;

    let item = await findItemService(id);
    if(!item){
      return res.status(404).json({message:"item not found"})
    }

    res.status(201).json({ ...item });
  } catch (error) {
    res
      .status(400)
      .json({ error: "something went wrong in item creation", message: error });
  }
};

// find items by filters
export const findItemsController = async (req: Request, res: Response) => {
  console.log("------controller:findItemsController---------")

  try {
    // Check if there are any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    // Extract and filter the request parameters dynamically
    const validParams = ["page", "pageSize", "minPrice", "maxPrice", "catalogId", "categoryId"];
    const filterParams: any = {};

    validParams.forEach(param => {
      if (req.body[param] !== undefined) {
        filterParams[param] = req.body[param];
      }
    });

    // Call the service function with the filtered parameters
    const items = await findItemsService(filterParams);

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong in fetching items", message: error });
  }
};

// update item
export const updateItemController = async (req: Request| any, res: Response) => {
  console.log("------controller:updateItemController---------")

  try {
    if(req.roleName!=="Admin"){
      return res
      .status(403)
      .json({ message: "You are not authorized" });
    }
    // Check if there are any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    // Extract and filter the request parameters dynamically
    const validParams = ["name", "catalogId", "categoryId", "quantity", "price"];
    const updateParams: any = {};
   
    // extracting the id
    const {id} = req.params
    updateParams.id = id

    validParams.forEach(param => {
      if (req.body[param] !== undefined) {
        updateParams[param] = req.body[param];
      }
    });

    // Ensure the ID is included
    if (!updateParams.id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Call the service function with the update parameters
    const updatedItem = await updateItemService(updateParams);

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Something went wrong in updating the item", message: error });
  }
};

// delete item
export const deleteItemController = async (req: Request|any, res: Response) => {
  console.log("------controller:deleteItemController---------")

  try {
    if(req.roleName!=="Admin"){
      return res
      .status(403)
      .json({ message: "You are not authorized" });
    }
    // Check if there are any validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ message: validationErrors.array()[0].msg });
    }

    const { id } = req.params;

    // Call the service function to delete the item
    await deleteItemService(id);

    res.status(200).json({message: "item was deleted Successfully"});
  } catch (error:any) {
    res
      .status(400)
      .json({ error: "Something went wrong in deleting the item", message: error.message  });
  }
};