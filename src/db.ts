import mongoose from "mongoose";
import { configs } from "./configs/config";

(async () => {
  try {
    await mongoose.connect(configs.db.uri + configs.db.name);
    console.log("DB is connected");
  } catch (err) {
    console.log("err in DB: ", err);
  }
})();
 