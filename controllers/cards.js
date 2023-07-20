const Card = require('../models/card');
const MissingError = require('../util/errors/MissingError');
const { handleErrors } = require('../util/handleErrors');

function handleAndSendCard(card, res) {
  if (card === null) {
    return Promise.reject(
      new MissingError('Запрашиваемая карточка не найдена'),
    );
  }
  return res.send({ data: card });
}

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => handleAndSendCard(card, res))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.createCard = (req, res) => {
  const { link, name } = req.body;
  const owner = req.user._id;

  Card.create({ link, name, owner })
    .then((card) => res.statsus(201).send({ data: card }))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.likeCard = (req, res) => {
  // console.log(req);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleAndSendCard(card, res))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleAndSendCard(card, res))
    .catch((err) => {
      handleErrors(res, err);
    });
};
