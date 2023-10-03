import { Request, Response } from "express";

export const login = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  console.log("dsfkghdj");
  resp.send("xd");
};
