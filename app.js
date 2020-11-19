const express = require('express');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cardsRouter = require(path.join(__dirname, './routes/cards')); // eslint-disable-line import/no-dynamic-require
const usersRouter = require(path.join(__dirname, './routes/users')); // eslint-disable-line import/no-dynamic-require
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((req, res, next) => {
  req.user = {
    _id: '5fb560f8e747ce0ddc0eeea9',
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
