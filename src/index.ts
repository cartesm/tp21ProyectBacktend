import "dotenv/config";
import express from "./app";
import { configs } from "./configs/config";

import "./db";

express.listen(configs.server.port, () => {
  console.log("server on port ", configs.server.port);
});


// TODO: hacer el inicio de sesion 

// TODO: hacer la parte de la api