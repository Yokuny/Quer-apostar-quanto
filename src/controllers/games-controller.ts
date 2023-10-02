import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "@/services/games-service";
import { CustomError } from "@/models";

export const postGame = async (req: Request, res: Response) => {
  try {
    const result = await service.postGame(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const result = await service.getGames();
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};

export const getGameInfo = async (req: Request, res: Response) => {
  try {
    const result = await service.getGameInfo(req.params.id);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};

export const finishGame = async (req: Request, res: Response) => {
  try {
    const result = await service.finishGame(req.body, req.params.id);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};
