import cookies from "cookie-parser";
import cors from "cors";
import express, { Express, Request } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import colors from "colors";
import authRoutes from "./routes/auth.routes";

import locationsRoutes from "./routes/locations.routes";
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

colors.enable();
server.use(cookies());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
server.use(
  multer({
    storage,
  }).single("img")
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

// routes

server.use(authRoutes);
server.use(locationsRoutes);

export default server;
