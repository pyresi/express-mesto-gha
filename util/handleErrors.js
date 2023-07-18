const MISSING_ERROR_CODE = 404;
const INVALID_ERROR_CODE = 400;
const DEFAULT_ERROR_CODE = 500;

module.exports.handleErrors = (res, err) => {
  // console.log(err);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(INVALID_ERROR_CODE).send({ message: err.message });
  } if (err.name === 'MissingError') {
    return res.status(MISSING_ERROR_CODE).send({ message: err.message });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка. Что-то пошло не так.' });
};
