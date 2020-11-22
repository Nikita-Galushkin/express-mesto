const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const userId = mongoose.Types.ObjectId(req.params._id);
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Нет пользователя с таким id' });
        }
        return res.send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).res.send({ data: user });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};
