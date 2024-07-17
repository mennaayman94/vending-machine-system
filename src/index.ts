import * as https from 'https';
import * as fs from 'fs';
import * as path from"path"
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './middlewares/logger';
import morgan from 'morgan';
import helmet from "helmet"
import cookieParser from "cookie-parser"
import limiter from './utils/rateLimiter';
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT|| 8000;  // HTTPS default port
// Middleware
app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(helmet())
app.use(cookieParser())
app.use(morgan('combined', { stream: accessLogStream }));
app.use(logger)
// Example route
app.get('/',(req: Request, res: Response) => {
  res.send('Hello, HTTPS with Express!');
});

// HTTPS options (key and cert)
const options = {
  key: fs.readFileSync( 'server.key'),
  cert: fs.readFileSync( 'server.cert')
};

// Create HTTPS server with Express
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message });
} else {
    res.status(500).send('Internal Server Error');
}
});