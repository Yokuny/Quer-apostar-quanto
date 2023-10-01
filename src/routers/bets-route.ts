import { Router } from "express";
// import { validateBody } from "@/middlewares/validation-middleware";

const betsRoute = Router();

betsRoute.post("/", (req, res) => res.send("Hello from bets route!"));

export { betsRoute };
