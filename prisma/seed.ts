import { prisma, connectDb } from "../src/database";

async function seed() {
  connectDb();

  await prisma.user.createMany({
    data: [
      { name: "Felps", balance: 9000 },
      { name: "Caio", balance: 5000 },
      { name: "João", balance: 4000 },
    ],
  });

  await prisma.game.createMany({
    data: [
      {
        homeTeamName: "Time da Casa",
        awayTeamName: "Time Visitante",
        homeTeamScore: 2,
        awayTeamScore: 1,
        isFinished: false,
      },
      {
        homeTeamName: "Time da Casa 2",
        awayTeamName: "Time Visitante 2",
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: true,
      },
      {
        homeTeamName: "Flamengo",
        awayTeamName: "Pernambuco",
        homeTeamScore: 2,
        awayTeamScore: 0,
        isFinished: false,
      },
      {
        homeTeamName: "Vasco",
        awayTeamName: "Ataid",
        homeTeamScore: 10,
        awayTeamScore: 3,
        isFinished: false,
      },
    ],
  });

  await prisma.bet.createMany({
    data: [
      {
        homeTeamScore: 1,
        awayTeamScore: 1,
        amountBet: 500,
        gameId: 2,
        participantId: 3,
        status: "PENDING",
      },
      {
        homeTeamScore: 2,
        awayTeamScore: 0,
        amountBet: 250,
        gameId: 2,
        participantId: 1,
        status: "PENDING",
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 2,
        amountBet: 300,
        gameId: 3,
        participantId: 2,
        status: "PENDING",
      },
      {
        homeTeamScore: 5,
        awayTeamScore: 2,
        amountBet: 400,
        gameId: 4,
        participantId: 1,
        status: "PENDING",
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 1,
        amountBet: 500,
        gameId: 4,
        participantId: 3,
        status: "PENDING",
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 0,
        amountBet: 250,
        gameId: 2,
        participantId: 3,
        status: "PENDING",
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 2,
        amountBet: 300,
        gameId: 3,
        participantId: 2,
        status: "PENDING",
      },
      {
        homeTeamScore: 2,
        awayTeamScore: 5,
        amountBet: 400,
        gameId: 4,
        participantId: 3,
        status: "PENDING",
      },
    ],
  });
}
seed();
