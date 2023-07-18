const User = require("../models/user");
const MissingError = require("../util/errors/MissingError");
const { handleErrors } = require("../util/handleErrors");

function handleAndSendUser(user, res) {
  if (user === null) {
    return Promise.reject(
      new MissingError("Запрашиваемый пользователь не найден")
    );
  }
  return res.send({ data: user });
}

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      return res.send({ data: users });
    })
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      return handleAndSendUser(user, res);
    })
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      return res.send({ data: user });
    })
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
    .then((user) => {
      return handleAndSendUser(user, res);
    })
    .catch((err) => {
      handleErrors(res, err);
    });
};

module.exports.modifyUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body["avatar"] },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .then((user) => {
      return handleAndSendUser(user, res);
    })
    .catch((err) => {
      handleErrors(res, err);
    });
};
