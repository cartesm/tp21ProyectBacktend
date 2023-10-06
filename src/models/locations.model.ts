import mongoose, { Document, model, Schema } from "mongoose";

export interface Ilocations extends Document {
  coordinates: [];
  name: string;
  author: {
    userName: string;
    id: string | mongoose.Types.ObjectId;
  };
  image: string;
  description: string;
  types: [];
  country: string;
}

const locationsSchema: Schema = new Schema(
  {
    coordinates: {
      type: Array,
      required: true,
    },
    author: {
      userName: {
        type: String,
        required: true,
      },
      id: {
        ref: "users",
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
    name: { type: String, required: true },
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
    country: {
      type: String,
      required: true,
    },
  },
  {
    collection: "locations",
    timestamps: true,
  }
);

export default model<Ilocations>("locations", locationsSchema);
