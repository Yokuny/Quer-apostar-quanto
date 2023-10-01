import { prisma } from "@/database";
import { Game } from "@prisma/client";

export const getGameById = (id: number) => {
  return prisma.game.findUnique({
    where: {
      id,
    },
  });
};
