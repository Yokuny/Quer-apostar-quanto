import * as respository from "@/repositories";
import { NewBetType } from "@/models";

export const postBet = async (data: NewBetType) => {
  const user = await respository.getUserById(data.participantId);
  if (!user) throw new Error("Participant not found");

  const game = await respository.getGameById(user.id);
  if (!game) throw new Error("Game not found");
  if (game.isFinished) throw new Error("Game already finished");

  const bet = await respository.getBetByGameIdAndParticipantId(game.id, user.id);
  if (bet) throw new Error("Participant already bet on this game");

  if (user.balance < data.amountBet) throw new Error("Insufficient balance");
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
