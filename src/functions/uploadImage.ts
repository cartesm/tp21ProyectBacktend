import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { configs } from "../configs/config";

const uploadImg = async (file: Express.Multer.File) /* : Promise<string> */ => {
  cloudinary.config({
    cloud_name: configs.cloudinary.cloudName,
    api_key: configs.cloudinary.apiKey,
    api_secret: configs.cloudinary.apiSecret,
  });

  try {
    // upload img
    const resp = await cloudinary.uploader.upload(
      path.join("src", `temp/${file.filename}`)
    );
    console.log(resp.url);

    //delete image after upload
    fs.unlink(path.join("src", `temp/${file.filename}`), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("img deleted: ",file.filename);
      }
    });

    return resp.url;
  } catch (err) {
    console.log(err);
    return new Error("error to try upload image");
  }
};

export default uploadImg;
