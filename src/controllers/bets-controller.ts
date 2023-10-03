import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/bets-service";
import { CustomError } from "../models";

export const postBet = async (req: Request, res: Response) => {
  try {
    const bet = await service.postBet(req.body);
    res.status(httpStatus.CREATED).json(bet);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};
