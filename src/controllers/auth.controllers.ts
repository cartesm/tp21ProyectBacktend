import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import createToken from "../functions/createToken";
import userModel, { IUserModel } from "../models/user.model";

export const login = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { password, email } = req.body;

  const matchUser: IUserModel | null = await userModel.findOne({ email });
  if (!matchUser) {
    return resp.status(404).json({ message: "user not found" });
  }

  const matchHash: boolean = await bcrypt.compare(password, matchUser.password);
  if (!matchHash) {
    return resp.status(401).json({ message: "password is incorrect" });
  }

  const token = await createToken({
    userName: matchUser.userName,
    email: matchUser.email,
  });

  resp.cookie("token", token);

  try {
  } catch (err) {
    console.log(err);
  }
};

export const register = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { password, userName, email, image } = req.body;

  //TODO: hacer vertificacion

  try {
    const matchUser: IUserModel | null = await userModel.findOne({ email });
    if (matchUser) {
      return resp.status(409).json({ message: "this user is already created" });
    }

    const newUser: IUserModel = new userModel({
      email,
      password,
      userName,
    });

    //TODO:hacer subida de imagenes

    const token = await createToken({
      userName: newUser.userName,
      email: newUser.email,
    });

    resp.cookie("token", token);

    const userSaved: IUserModel = await newUser.save();
    console.log(userSaved);

    return resp.send({
      userName: userSaved.userName,
      email: userSaved.email,
    });
  } catch (err) {
    console.log(err);
  }
};
