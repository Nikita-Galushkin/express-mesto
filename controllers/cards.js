const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    });
};

module.exports.likeCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const cardId = mongoose.Types.ObjectId(req.params._id);
    Card.findByIdAndUpdate({ _id: cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true })
      .then((likes) => {
        if (!likes) {
          return res.status(404).send({ message: 'Нет пользователя с таким id' });
        }
        return res.send(likes);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const cardId = mongoose.Types.ObjectId(req.params._id);
    Card.findByIdAndUpdate({ _id: cardId },
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true })
      .then((likes) => {
        if (!likes) {
          return res.status(404).send({ message: 'Нет пользователя с таким id' });
        }
        return res.send(likes);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};
