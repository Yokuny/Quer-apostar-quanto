import Joi from "joi";

export const gameSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const endGameSchema = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});
