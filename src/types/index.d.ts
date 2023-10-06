declare namespace Express {
  interface Request {
    user: {
      id: string;
      userName: string;
    } | null;
    counter: number | null;
  }
}
