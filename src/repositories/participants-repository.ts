import { prisma } from "../database";
import { NewParticipantType } from "../models/newPartipant-type";

export const postParticipant = (data: NewParticipantType) => {
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

export const updateParticipant = (id: number, balance: number) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      balance,
      updatedAt: new Date(),
    },
  });
};
