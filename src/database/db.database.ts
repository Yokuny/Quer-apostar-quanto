import { PrismaClient } from "@prisma/client";

export function connectDb(): void {
  const prisma = new PrismaClient();
  prisma.$connect();
}
