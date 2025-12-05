const express = require('express');
const router = express.Router();
const { users, loans } = require('../models/user');

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const user = { id: users.length + 1, name };
  users.push(user);
  res.status(201).json(user);
});

router.get('/:id/loans', (req, res) => {
  const userId = parseInt(req.params.id);
  const userLoans = loans.filter(l => l.userId === userId);
  res.json(userLoans);
});

module.exports = router;
