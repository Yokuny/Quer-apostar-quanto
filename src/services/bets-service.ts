export const postBet = (data: any) => {
  // O valor da aposta deve ser descontado imediatamente
  // do saldo do participante.
  // Checar se o participante existe data.participantId
  // Checar se o jogo existe data.gameId
  // Checar se o jogo já foi finalizado
  // Checar se o participante já apostou nesse jogo
  // Checar se o participante tem saldo suficiente para cobrir a aposta
  // Diminuir o saldo do participante
  // Criar a aposta
  /* {
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
	gameId: number; 
	participantId: number;
	status: string; // podendo ser PENDING, WON ou LOST
	amountWon: number || null; // nulo quando a aposta ainda está PENDING; number caso a aposta já esteja WON ou LOST, com o valor ganho representado em centavos
    } */

  return {};
};
