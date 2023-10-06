import jwt from "jsonwebtoken";
import { configs } from "../configs/config";

interface Idata {
  userName: string;
  email: string;
}

export default async (data: Idata) => {
  try {
    const token = await jwt.sign(data, configs.jwt.key);

    console.log(token)
    return token;
  } catch (err) {
    console.log(err);
  }
};
