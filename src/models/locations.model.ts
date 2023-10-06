import mongoose, { Document, model, Schema } from "mongoose";

export interface Ilocations extends Document {
  coordinates: [];
  name: string;
  author: string;
  image: string;
  description: string;
  types: [];
}

const locationsSchema: Schema = new Schema(
  {
    coordinates: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      ref: "users",
      type: mongoose.Types.ObjectId,
    },
    image: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "locations",
    timestamps: true,
  }
);

export default model<Ilocations>("locations", locationsSchema);
