const request = require('supertest');
const app = require('../app');
const { books } = require('../models/book');
const { loans } = require('../models/user');

beforeEach(() => {
  books.length = 0;
  loans.length = 0;
});

describe("Books API", () => {
  test("Create book", async () => {
    const res = await request(app).post('/books').send({ title: "JS Guide", author: "John" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("JS Guide");
    expect(books.length).toBe(1);
  });

  test("Borrow book", async () => {
    books.push({ id: 1, title: "JS Guide", author: "John", available: true });
    const res = await request(app).post('/books/1/borrow').send({ userId: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.bookId).toBe(1);
    expect(res.body.returned).toBe(false);
    expect(books[0].available).toBe(false);
  });

  test("Return book", async () => {
    books.push({ id: 1, title: "JS Guide", author: "John", available: false });
    loans.push({ id: 1, userId: 1, bookId: 1, returned: false });
    const res = await request(app).post('/books/1/return');
    expect(res.statusCode).toBe(200);
    expect(res.body.returned).toBe(true);
    expect(books[0].available).toBe(true);
  });
});
