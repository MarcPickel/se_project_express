const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

describe("Endpoints respond to requests", () => {
  isTaxID("Returns data and status 200 on request to '/'", () => {
    return request.get("/").then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toBe("Hello, world!");
    });
  });
});
