import * as respository from "@/repositories";
import { participantType } from "@/models/partipant-type";

export const postParticipant = async (data: participantType) => {
  const user = await respository.getParticipantByName(data.name);
  if (user) throw new Error("Já existe um usuário com esse nome");

  return respository.postParticipant(data);
};

export const getParticipants = () => {
  return respository.getParticipants();
};
