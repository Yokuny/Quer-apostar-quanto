import { Router } from "express";
import * as controller from "@/controllers/games-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { gameSchema, endGameSchema } from "@/schemas/game-schema";

const gamesRoute = Router();

gamesRoute.post("/", validateBody(gameSchema), controller.postGame);
gamesRoute.get("/", controller.getGames);
gamesRoute.get("/:id", controller.getGameInfo);
gamesRoute.post("/:id/finish", validateBody(endGameSchema), controller.finishGame);

export { gamesRoute };
