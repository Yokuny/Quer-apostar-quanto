import * as repository from "@/repositories";
import { NewGameType, NewGameDataType, CustomError } from "@/models";

export const postGame = async (data: NewGameDataType) => {
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
  const games = repository.getGames();
  if (!games) return [];

  return games;
};

const getGameById = async (id: string) => {
  if (!id) throw new CustomError("Id não informado", 400);

  const game = await repository.getGameById(Number(id));
  if (!game) throw new CustomError("Jogo não encontrado", 404);

  return game;
};

export const getGameInfo = async (id: string) => {
  const game = await getGameById(id);

  const bets = await repository.getBetsOfAGame(game.id);
  if (!bets) throw new CustomError("Nenhuma aposta encontrada", 404);

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

export const finishGame = async (data: NewGameDataType, id: string) => {
  const game = await getGameById(id);
  if (game.isFinished) throw new CustomError("Jogo já finalizado", 409);

  //Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a
  //ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes

  // - Ao finalizar um jogo, este deve ser marcado como finalizado (`isFinished = true`).
  // - Ao finalizar um jogo, o placar do jogo deve ser atualizado com os valores fornecidos.
  // - Ao finalizar um jogo, todas as apostas deste jogo devem ser atualizadas:
  //     - Apostas incorretas
  //         - Tem o `status` alterado de `PENDING` para `LOST`
  //         - Tem o `amountWon` alterado para `0`
  //     - Apostas corretas
  //         - Tem o `status` alterado de `PENDING` para `WON`
  //         - Tem o `amountWon` alterado para o quanto o participante ganhou naquela aposta
  //         - Atualiza o saldo do participante para acrescentar o valor ganho
  // - O valor ganho em uma aposta é dado pela seguinte fórmula:
  //     ```tsx
  //     Valor ganho em uma aposta = (Valor apostado nessa aposta / (soma do valor apostado de todas as apostas vencedoras daquele jogo)) * (soma do valor de todas as apostas daquele jogo) * (1 - taxa da casa)
  //     ```
  //     - A taxa da casa é um valor fixo de `0.3` (30%)
  //     - O valor final deve ser sempre arredondado pra baixo em caso de números fracionários
  //     - Exemplo do cálculo acima
  //         - No jogo Flamengo x Fluminense, foram feitas 3 apostas:
  //             - João apostou R$ 10,00 no placar 2x2
  //             - Maria apostou R$ 20,00 no placar 2x2
  //             - José apostou R$ 30,00 no placar 3x1
  //         - Supondo que o jogo tenha sido encerrado com o placar 2x2, João e Maria foram vencedores. O cálculo de quanto cada um deve ganhar seria o seguinte:
  //             ```tsx
  //             João: (1000 / (1000+2000)) * (1000+2000+3000) * (1 - 0.3) = 1400
  //             Maria: (2000 / (1000+2000)) * (1000+2000+3000) * (1 - 0.3) = 2800
  //             José: perdeu tudo = 0
  //             ```
  //             - Lembrando que os valores acima estão mapeados para inteiros representando os centavos (R$ 10,00 → 1000)
  /* {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
  } */
  return "não implementado";
};
