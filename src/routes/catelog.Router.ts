import express from 'express';
import { addRoleSchema } from '../schemaValidation/validateRole';
import { createRole } from '../Controller/role.Controller';
import { addCatelogSchema } from '../schemaValidation/validateCateloge';
import { createCatelog } from '../Controller/cataloge.Controller';
const catelogRouter = express.Router();


catelogRouter.post('/create', addCatelogSchema() ,createCatelog );
 export default catelogRouter