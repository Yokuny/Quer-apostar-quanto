import { Router } from "express";
import * as controller from "../controllers/games-controller";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { gameSchema, idSchema, endGameSchema } from "../schemas";

const gamesRoute = Router();

gamesRoute.post("/", validateBody(gameSchema), controller.postGame);
gamesRoute.get("/", controller.getGames);
gamesRoute.get("/:id", validateParams(idSchema), controller.getGameInfo);
gamesRoute.post("/:id/finish", validateParams(idSchema), validateBody(endGameSchema), controller.finishGame);

export { gamesRoute };
