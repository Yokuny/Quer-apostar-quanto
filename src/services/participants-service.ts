import * as respository from "@/repositories/participants-repository";
import { NewParticipantType, CustomError } from "@/models";

export const postParticipant = async (data: NewParticipantType) => {
  const user = await respository.getParticipantByName(data.name);
  if (user) throw new CustomError("Participant already registred", 409);

  return respository.postParticipant(data);
};

export const getParticipants = () => {
  return respository.getParticipants();
};
