const readFile = require('../utils/read-file');
const path = require('path');
const pathToDataUsers = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = (req, res) => {
  readFile(pathToDataUsers)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(404).send({ message: "Нет такого файла" })
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  readFile(pathToDataUsers)
    .then((data) => {
      const user = data.find((item) => {
        return item._id === id;
      })
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send({ message: "Нет пользователя с таким id" });
    });
};