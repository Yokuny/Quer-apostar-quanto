import { Request, Response } from "express";
import httpStatus from "http-status";

export const postParticipant = async (req: Request, res: Response) => {
  res.status(httpStatus.CREATED).send();
};

export const getParticipants = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send();
};
