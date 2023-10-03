import express, { Express } from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";

// inicializaciones

const server: Express = express();

// niddlewares

server.use(morgan("dev"));

// routes

server.use(authRoutes);

export default server;
