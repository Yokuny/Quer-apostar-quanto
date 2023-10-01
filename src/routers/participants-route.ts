import { Router } from "express";
import * as controller from "@/controllers/participants-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { participantSchema } from "@/schemas/participant-schema";

const participantsRoute = Router();

participantsRoute.post("/", validateBody(participantSchema), controller.postParticipant);
participantsRoute.get("/", controller.getParticipants);

export { participantsRoute };
