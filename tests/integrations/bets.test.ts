import supertest from "supertest";
import cleanDb from "../cleanDb.helper";
import app, { init } from "@/index";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /bets", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/bets");
    expect(response.status).toBe(400);
  });

  it("should respond with status 400 when body is invalid", async () => {
    const response = await server.post("/bets").send({ name: "a" });
    expect(response.status).toBe(400);
  });

  it("should respond with status 400 when body info is not valid", async () => {
    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: 10,
      participantId: 7,
    };
    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(401);
  });

  it("should respond with status 400 when amountBet is less than 100", async () => {
    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 10,
      gameId: 1,
      participantId: 7,
    };
    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(400);
  });

  it("should respond with status 201 when body is valid", async () => {
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: gameStatus.body.id,
      participantId: userStatus.body.id,
    };

    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(201);
  });

  it("should respond with status 409 when bet is already registred", async () => {
    await cleanDb();
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: gameStatus.body.id,
      participantId: userStatus.body.id,
    };

    await server.post("/bets").send(body);
    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(409);
  });

  it("should respond with status 401 when participant is not found", async () => {
    await cleanDb();
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: gameStatus.body.id,
      participantId: 7,
    };

    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(401);
  });

  it("should respond with status 404 when game is not found", async () => {
    await cleanDb();
    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: 10,
      participantId: userStatus.body.id,
    };

    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(404);
  });

  it("should respond with status 409 when game is finished", async () => {
    await cleanDb();
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    await server.post(`/games/${gameStatus.body.id}/finish`).send({ homeTeamScore: 1, awayTeamScore: 0 });

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: gameStatus.body.id,
      participantId: userStatus.body.id,
    };

    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(409);
  });

  it("should respond with status 402 when user has insufficient balance", async () => {
    await cleanDb();
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 9000,
      gameId: gameStatus.body.id,
      participantId: userStatus.body.id,
    };

    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(402);
  });

  it("should respond with status 409 when bet is already registred", async () => {
    await cleanDb();
    const gameStatus = await server.post("/games").send({ homeTeamName: "Santos", awayTeamName: "Team" });
    expect(gameStatus.status).toBe(201);

    const userStatus = await server.post("/participants").send({ name: "Yokuny", balance: 1000 });
    expect(userStatus.status).toBe(201);

    const body = {
      homeTeamScore: 4,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: gameStatus.body.id,
      participantId: userStatus.body.id,
    };

    await server.post("/bets").send(body);
    const response = await server.post("/bets").send(body);
    expect(response.status).toBe(409);
  });
});
