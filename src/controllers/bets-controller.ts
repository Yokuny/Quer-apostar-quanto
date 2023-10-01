import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/bets-service";

export const postBet = (req: Request, res: Response) => {
  const bet = service.postBet(req.body);
  res.status(httpStatus.CREATED).json(bet);
};
