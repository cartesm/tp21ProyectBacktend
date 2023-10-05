import cookies from "cookie-parser";
import cors from "cors";
import express, { Express, Request } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import authRoutes from "./routes/auth.routes";

// inicializaciones

const server: Express = express();
const storage = multer.diskStorage({
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, file.originalname);
  },
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, path.join("src", "temp"));
  },
});

// niddlewares

server.use(
  cors({
    credentials: false,
    origin: "",
  })
);
server.use(express.json());
server.use(morgan("dev"));
server.use(cookies());
server.use(
  multer({
    storage,
  }).single("img")
);

// routes

server.use(authRoutes);

export default server;
