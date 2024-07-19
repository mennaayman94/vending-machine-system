import express from 'express';
import { makePurchaseSchema } from '../schemaValidation/validatePurchase';
import { IsAuthunticated } from '../middlewares/isAuthunticated';
import { pusrchaseItems } from '../Controller/purchase.Controller';
const purchaseRouter = express.Router();


purchaseRouter.post('/create',IsAuthunticated, makePurchaseSchema() ,pusrchaseItems );




export default purchaseRouter;