// controllers/users.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const AuthorizationError = require('../util/errors/AuthorizationError');


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' }
      );

      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      return next(new AuthorizationError('Неверный email или пароль'));
    });
};