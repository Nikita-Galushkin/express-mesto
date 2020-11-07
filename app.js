const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const cardsRouter = require(path.join(__dirname, './routes/cards')); // eslint-disable-line import/no-dynamic-require
const usersRouter = require(path.join(__dirname, './routes/users')); // eslint-disable-line import/no-dynamic-require

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
