import { prisma } from "../database";
import { Game } from "@prisma/client";
import { NewGameType, NewGameDataType, GameScoreType } from "../models/newGame-type";

export const postGame = (data: NewGameType) => {
  return prisma.game.create({
    data,
  });
};

export const getGames = () => {
  return prisma.game.findMany();
};

export const getGameById = (id: number) => {
  return prisma.game.findUnique({
    where: {
      id,
    },
  });
};

export const getGameByHomeTeamAndAwayTeam = (data: NewGameDataType) => {
  return prisma.game.findFirst({
    where: {
      homeTeamName: data.homeTeamName,
      awayTeamName: data.awayTeamName,
    },
  });
};

export const finishGame = (id: number, data: GameScoreType) => {
  return prisma.game.update({
    where: {
      id,
    },
    data: {
      homeTeamScore: data.homeTeamScore,
      awayTeamScore: data.awayTeamScore,
      isFinished: true,
      updatedAt: new Date(),
    },
  });
};
