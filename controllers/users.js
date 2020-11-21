const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .orFail(new Error('NotValid'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValid') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
