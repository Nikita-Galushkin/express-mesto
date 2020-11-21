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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(new Error('NotValid'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'NotValid') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValid'))
    .then((likes) => {
      res.send({ data: likes });
    })
    .catch((err) => {
      if (err.name === 'NotValid') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValid'))
    .then((likes) => {
      res.send({ data: likes });
    })
    .catch((err) => {
      if (err.name === 'NotValid') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: err.message });
    });
};
