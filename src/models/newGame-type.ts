export interface NewGameDataType {
  homeTeamName: string;
  awayTeamName: string;
}

export interface NewGameType {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: 0;
  awayTeamScore: 0;
  isFinished: false;
}

export interface GameScoreType {
  homeTeamScore: number;
  awayTeamScore: number;
}
