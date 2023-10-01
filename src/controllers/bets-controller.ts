import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "@/services/bets-service";

export const postBet = async (req: Request, res: Response) => {
  try {
    const bet = await service.postBet(req.body);
    res.status(httpStatus.CREATED).json(bet);
  } catch (err) {
    console.error(err);
  }
};
