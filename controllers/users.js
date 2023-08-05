const User = require('../models/user');
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

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      handleErrors(res, err);
    });
}

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => handleAndSendUser(user, res))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.modifyUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleAndSendUser(user, res))
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.modifyUserAvatar = (req, res) => {
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
    .catch((err) => {
      handleErrors(res, err);
    });
};
