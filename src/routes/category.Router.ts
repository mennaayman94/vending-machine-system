import express from 'express';
import { addCategorySchema } from '../schemaValidation/validateCategory';
import { createCategory } from '../Controller/category.Controller';
const categoryRouter = express.Router();


categoryRouter.post('/create', addCategorySchema() ,createCategory );
 export default categoryRouter