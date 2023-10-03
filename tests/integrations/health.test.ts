import supertest from "supertest";
import app, { init } from "@/index";

beforeAll(async () => {
  await init();
});

const server = supertest(app);

describe("GET /health", () => {
  it("should respond with status 200", async () => {
    const response = await server.get("/health");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK!");
  });

  it("should respond with status 404", async () => {
    const response = await server.get("/healt");
    expect(response.status).toBe(404);
  });
});
