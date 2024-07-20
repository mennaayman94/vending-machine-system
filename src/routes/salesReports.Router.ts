import { salesReportsController } from "../Controller/salesReports.Controller";
import { IsAuthunticated } from "../middlewares/isAuthunticated";
import express from 'express';
import { reportFilterScheme } from "../schemaValidation/validateFilterReportScheme";
const reportsRouter = express.Router();


reportsRouter.get("/allReports",IsAuthunticated,reportFilterScheme(), salesReportsController);

export default reportsRouter
