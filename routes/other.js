const router = require('express').Router(); // создали роутер

router.all('/', (req, res, next) => next(new MissingError('Нет такого пути')));

module.exports = router;
