import express from "express";
import { createItemController, findItemController, findItemsController, updateItemController, deleteItemController } from "../Controller/item.Controller";
import { addItemSchema, ItemIdValidationRules, findItemsValidationRules, updateItemValidationRules } from "../schemaValidation/validateItem";
import { IsAuthunticated } from "../middlewares/isAuthunticated";

const itemRouter = express.Router();

itemRouter.post("/create",IsAuthunticated, addItemSchema(), createItemController);

itemRouter.get("/findone/:id",IsAuthunticated, ItemIdValidationRules(), findItemController);

itemRouter.get("/find",IsAuthunticated, findItemsValidationRules(), findItemsController);

itemRouter.patch("/update/:id",IsAuthunticated, updateItemValidationRules(), updateItemController);

itemRouter.delete("/delete/:id" ,IsAuthunticated, ItemIdValidationRules() , deleteItemController)

export default itemRouter;