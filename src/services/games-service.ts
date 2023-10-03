import * as repository from "@/repositories";
import { NewGameType, NewGameDataType, GameScoreType, CustomError, totalAmountType } from "@/models";
import { Bet } from "@prisma/client";

export const postGame = async (data: NewGameDataType) => {
  if (data.homeTeamName === data.awayTeamName) throw new CustomError("Times iguais", 406);

  const registredGame = await repository.getGameByHomeTeamAndAwayTeam(data);
  if (registredGame) throw new CustomError("Jogo já cadastrado", 409);

  const newGame: NewGameType = {
    homeTeamName: data.homeTeamName,
    awayTeamName: data.awayTeamName,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
  };

  return repository.postGame(newGame);
};

export const getGames = async () => {
  const games = await repository.getGames();
  if (!games || !games.length) return [];

  return games;
};

const getGameById = async (id: string) => {
  const game = await repository.getGameById(Number(id));
  if (!game) throw new CustomError("Jogo não encontrado", 404);

  return game;
};

export const getGameInfo = async (id: string) => {
  const game = await getGameById(id);

  const bets = await repository.getBetsOfAGame(game.id);
  if (!bets) throw new CustomError("Erro ao buscar apostas", 500);

  const gameInfo = {
    id: game.id,
    createdAt: game.createdAt,
    updatedAt: game.updatedAt,
    homeTeamName: game.homeTeamName,
    awayTeamName: game.awayTeamName,
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    isFinished: game.isFinished,
    bets: bets.map((bet) => ({
      id: bet.id,
      createdAt: bet.createdAt,
      updatedAt: bet.updatedAt,
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: bet.status,
      amountWon: bet.amountWon,
    })),
  };

  return gameInfo;
};

const calculateWinningAmount = (bets: Bet[]) => {
  const houseGain = 0.3;

  const allMoney = bets.reduce((total: number, bet: Bet) => {
    if (bet.status === "PENDING") return total + bet.amountBet;
    return total;
  }, 0);

  const finalAmount = allMoney * (1 - houseGain);

  return { finalAmount, totalAmount: allMoney };
};

const calculateAmount = (bet: Bet, totalAmount: number, totalWinning: number) => {
  const roundDown = (value: any, decimalPlaces = 0) => {
    const factor = 10 ** decimalPlaces;
    return Math.floor(value * factor) / factor;
  };
  return roundDown((bet.amountBet / totalWinning) * totalAmount);
};

const processBet = async (bet: Bet, data: GameScoreType, totalAmount: totalAmountType) => {
  if (bet.status === "PENDING") {
    if (bet.homeTeamScore === data.homeTeamScore && bet.awayTeamScore === data.awayTeamScore) {
      const betWinningAmount = calculateAmount(bet, totalAmount.totalAmount, totalAmount.finalAmount);

      await repository.updateBet(bet.id, "WON", betWinningAmount);

      const user = await repository.getUserById(bet.participantId);
      if (user) {
        const newBalance = user.balance + betWinningAmount;
        await repository.updateParticipant(user.id, newBalance);
      } else {
        await repository.updateBet(bet.id, "LOST", 0);
      }
    }
  }
};

export const finishGame = async (data: GameScoreType, id: string) => {
  const game = await getGameById(id);
  if (game.isFinished) throw new CustomError("Jogo já finalizado", 409);

  const bets = await repository.getBetsOfAGame(game.id);
  if (!bets) throw new CustomError("Erro ao buscar apostas", 500);

  const totalAmount = calculateWinningAmount(bets);

  for (const bet of bets) await processBet(bet, data, totalAmount);

  return await repository.finishGame(Number(id), data);
};

