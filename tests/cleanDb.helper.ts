import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function cleanDb() {
  await prisma.bet.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.game.deleteMany({});
}
