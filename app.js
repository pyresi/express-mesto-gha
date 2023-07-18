const express = require("express");
const mongoose = require("mongoose");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error(err);
  });

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use((req, res, next) => {
  req.user = {
    _id: "64b4dd78b3968e28b8f6c84f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

const userRouter = require("./routes/users"); // импортируем роутер
app.use("/users", userRouter); // запускаем

const cardRouter = require("./routes/cards"); // импортируем роутер
app.use("/cards", cardRouter); // запускаем

const otherRouter = require("./routes/other");
app.use("/*", otherRouter);
