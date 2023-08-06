module.exports.handleErrors = (res, err) => {
  return res.status(err.statusCode).send({ message: err.message });
};
