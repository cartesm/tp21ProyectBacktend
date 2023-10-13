import mongoose from "mongoose";
import { configs } from "./configs/config";

(async () => {
  try {
    await mongoose.connect(`mongodb://${configs.db.userName}:${configs.db.password}@ac-p2o5dc8-shard-00-00.gnuqu5a.mongodb.net:27017,ac-p2o5dc8-shard-00-01.gnuqu5a.mongodb.net:27017,ac-p2o5dc8-shard-00-02.gnuqu5a.mongodb.net:27017/?ssl=true&replicaSet=atlas-kflfrt-shard-0&authSource=admin&retryWrites=true&w=majority`);
    console.log("DB is connected");
  } catch (err) {
    console.log("err in DB: ", err);
  }
})();
 