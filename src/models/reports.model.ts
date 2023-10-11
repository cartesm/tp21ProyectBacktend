import mongoose, { Document, Schema, model } from "mongoose";

export interface Ireport extends Document {
  tittle: string;
  description: string;
  user: mongoose.Types.ObjectId | string;
}

const reportSchema: Schema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    user: {
      ref: "users",
      type: mongoose.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "reports",
  }
);

export default model<Ireport>("reports", reportSchema);
