import jwt from "jsonwebtoken";
import { configs } from "../configs/config";

interface Idata {
  userName: string;
  email: string;
}

export default async (data: Idata) => {
  try {
    const token = await jwt.sign(data, configs.jwt.key, (err, token) => {
      if (err) console.log(err);
    });

    return token;
  } catch (err) {
    console.log(err);
  }
};
