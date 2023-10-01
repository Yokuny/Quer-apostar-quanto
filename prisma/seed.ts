import { prisma } from "../src/database";

async function seed() {
  // Create some users
  const users = await prisma.user.createMany([
    {
      name: "John Doe",
      balance: 100,
    },
    {
      name: "Jane Doe",
      balance: 50,
    },
  ]);

  // Create some games
  const games = await prisma.game.createMany([
    {
      homeTeamName: "Manchester United",
      awayTeamName: "Liverpool",
    },
    {
      homeTeamName: "Barcelona",
      awayTeamName: "Real Madrid",
    },
  ]);

  // Create some bets
  const bets = await prisma.bet.createMany([
    {
      participantId: users[0].id,
      gameId: games[0].id,
      homeTeamScore: 2,
      awayTeamScore: 1,
      amountBet: 10,
    },
    {
      participantId: users[1].id,
      gameId: games[0].id,
      homeTeamScore: 1,
      awayTeamScore: 2,
      amountBet: 5,
    },
    {
      participantId: users[0].id,
      gameId: games[1].id,
      homeTeamScore: 3,
      awayTeamScore: 1,
      amountBet: 20,
    },
  ]);
}

seed();
