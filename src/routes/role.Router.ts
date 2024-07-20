import express from 'express';
import { addRoleSchema } from '../schemaValidation/validateRole';
import { createRole } from '../Controller/role.Controller';
const roleRouter = express.Router();


 roleRouter.post('/create', addRoleSchema() ,createRole );
 export default roleRouter