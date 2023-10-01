import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "@/services/games-service";

export const postGame = async (req: Request, res: Response) => {
  const result = await service.postGame(req.body);
  res.status(httpStatus.CREATED).send(result);
};

export const finishGame = async (req: Request, res: Response) => {
  const result = await service.finishGame(req.body, req.params.id);
  res.status(httpStatus.OK).send(result);
};

export const getGames = async (req: Request, res: Response) => {
  const result = await service.getGames();
  res.status(httpStatus.OK).send(result);
};

export const getGameInfo = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send();
};
