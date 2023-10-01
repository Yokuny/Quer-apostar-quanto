import { Request, Response } from "express";
import httpStatus from "http-status";

export const postGame = async (req: Request, res: Response) => {
  res.status(httpStatus.CREATED).send();
};

export const finishGame = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send();
};

export const getGames = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send();
};

export const getGameInfo = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send();
};
