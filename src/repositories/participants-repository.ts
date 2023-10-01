import { prisma } from "@/database";
import { User } from "@prisma/client";
import { participantType } from "@/models/partipant-type";

export const postParticipant = (data: participantType) => {
  return prisma.user.create({
    data,
  });
};

export const getParticipants = () => {
  return prisma.user.findMany();
};

export const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getParticipantByName = (name: string) => {
  return prisma.user.findFirst({
    where: {
      name,
    },
  });
};

export const discountBetAmount = (userId: number, amount: number) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
};
