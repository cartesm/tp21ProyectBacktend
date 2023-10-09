import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../configs/config";

const auth = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<NextFunction | Response | any> => {
  console.log("middleware auth");

  const  token  = req.cookies.token;
  
  if (!token) {
    console.log("no token ")
    return resp.status(401).json({ message: "not token created" });
  }

  await jwt.verify(token, configs.jwt.key, (err: any, decoded: any) => {
    if (err) {
      console.log("err");
      return resp.status(401).json({ message: "token not valid" });
    }
    req.user = decoded;
  });

 return next();
};

export default auth;
