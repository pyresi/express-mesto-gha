const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), dislikeCard);

module.exports = router;
