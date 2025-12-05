const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

module.exports = app;
