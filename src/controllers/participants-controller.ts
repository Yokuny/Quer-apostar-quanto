import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/participants-service";
import { CustomError } from "../models";

export const postParticipant = async (req: Request, res: Response) => {
  try {
    const result = await service.postParticipant(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};

export const getParticipants = async (req: Request, res: Response) => {
  try {
    const result = await service.getParticipants();
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};
