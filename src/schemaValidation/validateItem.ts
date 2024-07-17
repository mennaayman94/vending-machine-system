import { body } from 'express-validator';
export const addItemSchema = [body('name').isString().isLength({min:5,max:255}), body('catalogeId').isUUID(),body("quantity").isInt(),body("price")];
export const updateItemSchema = [body('name').isString().isLength({min:5,max:255}), body('catalogeId').isUUID(),body("quantity").isInt(),body("price")];