const express = require('express');
const router = express.Router();
const { books } = require('../models/books');
const { loans } = require('../models/user');

router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title & author required' });

  const book = { id: books.length + 1, title, author, available: true };
  books.push(book);
  res.status(201).json(book);
});

router.post('/:id/borrow', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { userId } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book || !book.available) return res.status(400).json({ error: 'Book unavailable' });

  const loan = { id: loans.length + 1, userId, bookId, date: new Date(), returned: false };
  loans.push(loan);
  book.available = false;
  res.json(loan);
});

router.post('/:id/return', (req, res) => {
  const bookId = parseInt(req.params.id);
  const loan = loans.find(l => l.bookId === bookId && !l.returned);
  if (!loan) return res.status(400).json({ error: 'Loan not found' });

  loan.returned = true;
  const book = books.find(b => b.id === bookId);
  book.available = true;
  res.json(loan);
});

module.exports = router;
