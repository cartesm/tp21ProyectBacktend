declare namespace Express {
  interface Request {
    user: {
      userName: string;
      email: string;
      id: string;
    } | null;
    counter: number | null;
  }
}
