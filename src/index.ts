import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connect } from "./prisma/client";
import limiter from "./utils/rateLimiter";
import itemRouter from "./routes/item.Router";
import userRouter from "./routes/user.Router";
import { connectRedis } from "./redis/clients";
import rateLimit from "express-rate-limit";
import purchaseRouter from "./routes/purchase.Router";
import roleRouter from "./routes/role.Router";
import catelogRouter from "./routes/catelog.Router";
import categoryRouter from "./routes/category.Router";
import reportsRouter from "./routes/salesReports.Router";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 8000; // HTTPS default port

app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());

app.use(cookieParser());

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/items", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/payment",limiter,purchaseRouter)
app.use("/api/roles",roleRouter)
app.use("/api/catelogs",catelogRouter)
app.use("/api/category",categoryRouter)
app.use("/api/reports",limiter,reportsRouter)
// HTTPS options (key and cert)
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

// Create HTTPS server with Express
https.createServer(options, app).listen(port, async () => {
  // connnect to the db
  await connect();
  await connectRedis();
  console.log(`Server is running on https://localhost:${port}`);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ error: error?.message });
  } else {
    res.status(500).send("Internal Server Error");
  }
});
export default app;
