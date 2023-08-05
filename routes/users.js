const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  modifyUser,
  modifyUserAvatar,
  getUserInfo
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), getUserById);
// router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  }),
}), modifyUser);

router.get('/me', getUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
    link: Joi.string().required()
  }),
}), modifyUserAvatar);

module.exports = router;
