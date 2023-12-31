import supertest from "supertest";
import cleanDb from "../cleanDb.helper";
import app, { init } from "@/index";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /participants", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/participants");
    expect(response.status).toBe(400);
  });
  it("should respond with status 400 when body is invalid", async () => {
    const response = await server.post("/participants").send({ name: "a" });
    expect(response.status).toBe(400);
  });
  it("should respond with status 201 when body is valid", async () => {
    const response = await server.post("/participants").send({ name: "John Doe", balance: 1000 });
    expect(response.status).toBe(201);
  });
  it("should respond with status 409 when body is valid but participant already exists", async () => {
    const response = await server.post("/participants").send({ name: "John Doe", balance: 1000 });
    expect(response.status).toBe(409);
  });
});

describe("GET /participants", () => {
  it("should respond with status 200", async () => {
    const response = await server.get("/participants");
    expect(response.status).toBe(200);
  });

  it("should respond with status 200 and return an array of participants", async () => {
    const response = await server.get("/participants");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          balance: expect.any(Number),
        }),
      ])
    );
  });

  it("should respond with status 200 and return an empty array", async () => {
    await cleanDb();
    const response = await server.get("/participants");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
