import * as respository from "@/repositories/participants-repository";
import { NewParticipantType } from "@/models/newPartipant-type";

export const postParticipant = async (data: NewParticipantType) => {
  const user = await respository.getParticipantByName(data.name);
  if (user) throw new Error("Já existe um usuário com esse nome");

  return respository.postParticipant(data);
};

export const getParticipants = () => {
  return respository.getParticipants();
};
