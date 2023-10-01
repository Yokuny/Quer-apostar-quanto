import { Router } from "express";
// import { validateBody } from "@/middlewares/validation-middleware";

const gamesRoute = Router();

gamesRoute.get("/", (req, res) => res.send("Hello from get games route!"));
gamesRoute.get("/:id", (req, res) => res.send("Hello from get games route by id!"));
gamesRoute.post("/:id/finish", (req, res) => res.send("Hello from post games route by id and finish!"));
gamesRoute.post("/", (req, res) => res.send("Hello from post games route!"));

export { gamesRoute };
