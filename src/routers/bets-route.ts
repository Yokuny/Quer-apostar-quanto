import { Router } from "express";
import * as controller from "../controllers/bets-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { betSchema } from "../schemas";

const betsRoute = Router();

betsRoute.post("/", validateBody(betSchema), controller.postBet);

export { betsRoute };
