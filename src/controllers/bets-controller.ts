import { Request, Response } from "express";

export const postBet = (req: Request, res: Response) => {
  res.send("Hello from post bets route!");
};
