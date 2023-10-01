import express, { Application } from "express";
import { participantsRoute, gamesRoute, betsRoute } from "./routers";
import { connectDb } from "./database";

const app: Application = express();

app
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/participants", participantsRoute)
  .use("/games", gamesRoute)
  .use("/bets", betsRoute);

export function init(): Promise<express.Application> {
  connectDb();
  return Promise.resolve(app);
}

export default app;
