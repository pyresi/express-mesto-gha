module.exports.handleErrors = (res, err) => {
  console.log(err);
  if (err.name == "ValidationError" || err.name == "CastError") {
    return res.status(400).send({ message: err.message });
  } else if (err.name == "MissingError") {
    return res.status(404).send({ message: err.message });
  } else {
    return res.status(500).send({ message: "Ошибка. Что-то пошло не так." });
  }
};
