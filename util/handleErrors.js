const MISSING_ERROR_CODE = 404;
const AUTHORIZATION_ERROR_CODE = 401;
const INVALID_ERROR_CODE = 400;
const DEFAULT_ERROR_CODE = 500;

module.exports.handleErrors = (res, err) => {
  // console.log(err);
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequestError') {
    return res.status(INVALID_ERROR_CODE).send({ message: err.message });
  } else if (err.name === 'MissingError') {
    return res.status(MISSING_ERROR_CODE).send({ message: err.message });
  } else if (err.name === 'BadAuthorizationError') {
    return res.status(AUTHORIZATION_ERROR_CODE).send({ message: err.message });
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка. Что-то пошло не так.' });
};
