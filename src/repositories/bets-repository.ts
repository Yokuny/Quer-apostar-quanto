import { prisma } from "@/database";
import { Bet } from "@prisma/client";
import { NewBetType } from "@/models/newBet-type";

export const postBet = (data: NewBetType) => {
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


export const updateBet = (id: number, status: string, amountWon: number) => {
  return prisma.bet.update({
    where: {
      id,
    },
    data: {
      status,
      amountWon,
      updatedAt: new Date(),
    },
  });
};