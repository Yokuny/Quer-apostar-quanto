import * as respository from "@/repositories";
import { NewBetType, CustomError } from "@/models";

export const postBet = async (data: NewBetType) => {
  const user = await respository.getUserById(data.participantId);
  if (!user) throw new CustomError("Participant not found", 401);

  const game = await respository.getGameById(user.id);
  if (!game) throw new CustomError("Game not found", 404);
  if (game.isFinished) throw new CustomError("Game is finished", 409);

  const bet = await respository.getBetByGameIdAndParticipantId(game.id, user.id);
  if (bet) throw new CustomError("Bet already registred", 409);

  if (user.balance < data.amountBet) throw new CustomError("Insufficient balance", 402);
  await respository.discountBetAmount(user.id, data.amountBet);

  const newBet = {
    homeTeamScore: data.homeTeamScore,
    awayTeamScore: data.awayTeamScore,
    amountBet: data.amountBet,
    gameId: game.id,
    participantId: user.id,
  };

  return await respository.postBet(newBet);
};
