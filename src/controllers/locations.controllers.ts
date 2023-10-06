import { Request, Response } from "express";
import locationsModel, { Ilocations } from "../models/locations.model";

export const addLocation = async (
  req: Request,
  resp: Response
): Promise<Response | any> => {
  const { coordinates, name, description, types } = req.body;
  const image = req.file;

  try {
    const newLocation: Ilocations = new locationsModel();
  } catch (err) {
    console.log(err);
  }
};
