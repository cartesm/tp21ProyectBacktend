import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../configs/config";

const auth = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<NextFunction | Response | any> => {
  const { token } = req.cookies;
  if (!token) {
    return resp.status(401).json({ message: "not token created" });
  }

  jwt.verify(token, configs.jwt.key, (err: any, decoded: any) => {
    if (err) {
      return resp.status(401).json({ message: "token not valid" });
    }
    req.user = decoded;
  });

  next();
};

export default auth;
