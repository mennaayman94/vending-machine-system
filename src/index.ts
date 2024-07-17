import * as https from 'https';
import * as fs from 'fs';
import * as path from"path"
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './middlewares/logger';
import morgan from 'morgan';
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT|| 8000;  // HTTPS default port
// Middleware
app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
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
