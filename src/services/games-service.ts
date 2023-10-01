
export const postGame = async (data: any) => {
  // chegar se há registro com data.homeTeamName e data.awayTeamName
  // se não houver, criar um registro com esses dados

  // retornar
  // {
  // 	id: number;
  // 	createdAt: string;
  // 	updatedAt: string;
  // 	homeTeamName: string;
  // 	awayTeamName: string;
  // 	homeTeamScore: number; // inicialmente 0
  // 	awayTeamScore: number; // inicialmente 0
  // 	isFinished: boolean; // inicialmente false
  // }

  return {};
};

export const finishGame = async (data: any, id: any) => {
  //Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a
  //ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes
  // checar se há registro com id
  // se não houver, retornar erro
  // checar se isFinished é true
  // se for, retornar erro
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
};

export const getGames = async () => {
  // retornar todos os jogos
  /* {
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean;
}[]*/
  return [];
};

export const getGameInfo = async () => {
  // Retorna os dados de um jogo junto com as apostas atreladas a ele.
  // checar se há registro com id
  // se não houver, retornar erro

  // retornar
  /* {
    {
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean;
	bets: {
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
	}[]
} */

  return {};
};
  