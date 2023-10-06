import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { configs } from "../configs/config";

export interface Idata {
  userName: string;
  email: string;
  id:mongoose.Types.ObjectId;
}

export default async (data: Idata) => {
  try {
    const token = await jwt.sign(data, configs.jwt.key);

    return token;
  } catch (err) {
    console.log(err);
  }
};
