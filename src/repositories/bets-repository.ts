import { prisma } from "@/database";
import { Bet } from "@prisma/client";

export const postBet = (data: any) => {
  return prisma.bet.create({
    data,
  });
};

export const getBetByGameIdAndParticipantId = (gameId: number, participantId: number) => {
  return prisma.bet.findFirst({
    where: {
      gameId: gameId,
      participantId: participantId,
    },
  });
};

export const getBetsOfAGame = (gameId: number) => {
  return prisma.bet.findMany({
    where: {
      gameId: gameId,
    },
  });
};
