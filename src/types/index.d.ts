declare namespace Express {
  interface Request {
    user: {
      id: string;
      userName: string;
    };
    counter: number;
  }
}
