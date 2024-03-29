import { Request, Response } from "express";
import uploadImage from "../functions/uploadImage";
import locationsModel, { Ilocations } from "../models/locations.model";

export const addLocation = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { coordinates, name, description, types, country } = req.body;

  const img = req.file;
  const userId = req.user?.id;
  const userName = req.user?.userName;

  const coords: Array<string> = coordinates.split(",");
  const typs: Array<string> = types.split(",");

  try {
    const newLocation: Ilocations = new locationsModel({
      author: {
        id: userId,
        userName: userName,
      },
      coordinates: [coords[0], coords[1]],
      name,
      description,
      types: typs,
      country,
    });

    if (img) {
      const imgUrl:string | Error = await uploadImage(img);
      if (typeof imgUrl != "string") {
        return resp.status(406).json({ message: "error to upload image" });
      }
      newLocation.image = imgUrl;
    }

    await newLocation.save();

    return resp.json(newLocation);
  } catch (err) {
    console.log(err);
  }
};

export const getAllLocationsByCountry = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { country } = req.body;

  try {
    const matches: Array<Ilocations> = await locationsModel.find({ country });

    if (matches.length >= 0) {
      return resp.status(204).json({ message: "no location in this country" });
    }

    return resp.json(matches);
  } catch (err) {
    console.log(err);
  }
};

export const getGlobalLocations = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const matches: Array<Ilocations> = await locationsModel.find();

  if (matches.length == 0) {
    return resp.status(204).json({ message: "no location in this planet" });
  }
  console.log(matches);

  return resp.json(matches);
};

export const getOneLocation = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { id } = req.params;

  const match: Ilocations | null = await locationsModel.findOne({ _id: id });

  if (!match) {
    return resp.status(204).json({ message: "this id not exist" });
  }

  console.log(match);

  return resp.json(match);
};

// TODO: test this
