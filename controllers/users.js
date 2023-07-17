const User = require("../models/user");

function handleError(res) {
  return res.status(500).send({ message: "Произошла ошибка" });
}

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.getUserById = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res);
    });
};

module.exports.modifyUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res);
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
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(res);
    });
};
