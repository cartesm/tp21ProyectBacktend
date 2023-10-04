export interface Iconfig {
  db: {
    uri: string;
    userName: string;
    password: string;
    name: string;
  };
  server: {
    port: string | number;
  };
  jwt: {
    key: string;
  };
}

export const configs: Iconfig = {
  server: {
    port: process.env.PORT || 2000,
  },
  db: {
    name: process.env.DB_NAME || "exampleDB",
    userName: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    uri: process.env.DB_URI || "mongodb://127.0.0.1:27017/myapp",
  },
  jwt: {
    key: process.env.JWT_KEY || "112",
  },
};
