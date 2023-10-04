import { Document, Schema, model } from "mongoose";

export interface IUserModel extends Document {
  userName: string;
  password: string;
  email: string;
  image: string;
}

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "https://robohash.org/pende",
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default model<IUserModel>("users", userSchema);
