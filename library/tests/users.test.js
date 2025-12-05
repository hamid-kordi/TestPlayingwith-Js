const request = require("supertest");
const app = require("../app");
const { books } = require("../models/books.js");
const { loans } = require("../models/users.js");

beforeAll(() => {
  books.length = 0;
  loans.length = 0;
});

describe("User Test Api", () => {
  test("CreateUser", async () => {
    const res = await request(app).post("/users").send({ name: "ali" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("ali");
    expect(res.length).toBe(1);
    expect(res.body.name).be;
  });

  test("Get loans for user", async () => {
    users.push({ id: 1, name: "Ali" });
    loans.push({ id: 1, userId: 1, bookId: 1, returned: false });
    const res = await request(app).get("/users/1/loans");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].returned).toBe(false);
  });
});
