const User = require('../models/user');
const AuthorizationError = require('../util/errors/AuthorizationError');
const MissingError = require('../util/errors/MissingError');

const { handleErrors } = require('../util/handleErrors');
const bcrypt = require('bcryptjs');

function handleAndSendUser(user, res) {
  if (user === null) {
    return Promise.reject(
      new MissingError('Запрашиваемый пользователь не найден'),
    );
  }
  return res.send({ data: user });
}

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return handleAndSendUser(user, res);
    })
    .catch(next);
}

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => handleAndSendUser(user, res))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => {
      delete user['password'];
      return res.status(201).send({ data: user })
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new AuthorizationError('Ошибка авторизации'));
      }
      next(err);
    }
    );
};

module.exports.modifyUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleAndSendUser(user, res))
    .catch(next);
};

module.exports.modifyUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => handleAndSendUser(user, res))
    .catch(next);
};
