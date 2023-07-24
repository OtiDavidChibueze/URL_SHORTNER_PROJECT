// URL SHORTENER APPLICATION FILE
import express from "express";
import logger from "../config/logger.mjs";
import morgan from "morgan";
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser'
const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(helmet())
app.use(bodyParser.json())

// routes
import Shortener_Routes from './shortner.mjs';
import User_Routes from './user.mjs';

// import all the route files here and add them in this file as shown below:
app.use('/api/v1/url', Shortener_Routes)
app.use('/api/v1/user', User_Routes)

export default app;