import { Router } from "express";
// import { validateBody } from "@/middlewares/validation-middleware";

const participantsRoute = Router();

participantsRoute.get("/", (req, res) => res.send("Hello from get participants route!"));
participantsRoute.post("/:id", (req, res) => res.send("Hello from post participants route by id!"));

export { participantsRoute };
