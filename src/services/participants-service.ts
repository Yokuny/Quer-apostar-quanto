export const postParticipant = async (data: any) => {
  //checar se já há usuario com o mesmo nome data.name
  //se não houver, criar um novo usuario

  // retornar o usuario criado
  // {
  //   id: number;
  //   createdAt: string;
  //   updatedAt: string;
  //   name: string;
  //   balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  // }
  return {};
};

export const getParticipants = async () => {
  // retornar todos os usuarios
  /*
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  }[]
  */
  return [];
};
