const router = require("express").Router(); // создали роутер

router.all("/", (req, res) => {
  return res.status(404).send({ message: "Неправильный путь" });
});

module.exports = router;
