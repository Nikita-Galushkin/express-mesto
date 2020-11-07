const readFile = require('../utils/read-file');
const path = require('path');
const pathToDataCards = path.join(__dirname, '..', 'data', 'cards.json');

module.exports.getCards = (req, res) => {
  readFile(pathToDataCards)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(404).send({ message: "Нет такого файла" })
    });
};