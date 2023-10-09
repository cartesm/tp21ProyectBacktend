import bcrypt from "bcrypt";
import { Request, Response } from "express";
import createToken from "../functions/createToken";
import uploadImage from "../functions/uploadImage";
import userModel, { IUserModel } from "../models/user.model";

export const login = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { password, email, type } = req.body;
  console.log(req.body);
  try {
    const matchUser: IUserModel | null = await userModel.findOne({ email });
    if (!matchUser) {
      return resp.status(404).json({ message: "user not found" });
    }

    const matchHash: boolean = await bcrypt.compare(
      password,
      matchUser.password
    );

    if (matchHash) {
      return resp.status(401).json({ message: "password is incorrect" });
    }

    const token = await createToken({
      userName: matchUser.userName,
      email: matchUser.email,
      id: matchUser._id,
    });

    resp.cookie("token", token);

    return resp.json({
      userName: matchUser.userName,
      email: matchUser.email,
      id: matchUser._id,
      img: matchUser.image,
    });
  } catch (err) {
    console.log(err);
  }
};

export const register = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { password, userName, email } = req.body;
  const img = req.file;

  try {
    const matchUser: IUserModel | null = await userModel.findOne({ email });
    if (matchUser) {
      return resp.status(409).json({ message: "this user is already created" });
    }
    console.log(`${(req.body.userName, req.body.email)}`.bgGreen);
    const passwordHash: string = await bcrypt.hash(password, 10);

    const newUser: IUserModel = new userModel({
      email,
      password: passwordHash,
      userName,
    });

    if (img) {
      const imgUrl: string | Error = await uploadImage(img);
      if (typeof imgUrl != "string") {
        return resp.status(406).json({ message: "error to upload image" });
      }
      newUser.image = imgUrl;
    }

    const token = await createToken({
      userName: newUser.userName,
      email: newUser.email,
      id: newUser._id,
    });

    resp.cookie("token", token);

    const userSaved: IUserModel = await newUser.save();

    return resp.send({
      userName: newUser.userName,
      email: newUser.email,
      id: newUser._id,
      img: newUser.image,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req: Request, resp: Response): Response => {
  resp.clearCookie("token", {
    expires: new Date(),
  });

  req.user = null;

  return resp.status(200).json({ message: "loged out" });
};
// * 604800000
