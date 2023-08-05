const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./util/handleErrors');
const { celebrate, Joi } = require('celebrate');
// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
  });

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30)
  })
}), createUser);

app.use(auth);

const userRouter = require('./routes/users');
// импортируем роутер
app.use('/users', userRouter); // запускаем

const cardRouter = require('./routes/cards');
// импортируем роутер
app.use('/cards', cardRouter); // запускаем

const otherRouter = require('./routes/other');

app.use('/*', otherRouter);


app.use((err, req, res, next) => {
  return handleErrors(res, err);
});