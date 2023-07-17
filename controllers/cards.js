const Card = require("../models/card");

function handleError(res) {
  return res.status(500).send({ message: "Произошла ошибка" });
}

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.createCard = (req, res) => {
  const { link, name } = req.body;
  const owner = req.user._id;

  Card.create({ link, name, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleError(res);
    });
};
