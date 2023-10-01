import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "@/services/participants-service";

export const postParticipant = async (req: Request, res: Response) => {
  const result = await service.postParticipant(req.body);
  res.status(httpStatus.CREATED).send(result);
};

export const getParticipants = async (req: Request, res: Response) => {
  const result = await service.getParticipants();
  res.status(httpStatus.OK).send(result);
};
