const router = require("express").Router(); // создали роутер

router.get("/", (req, res) => {
  return res.status(404).send({ message: "Неправильный путь" });
});

module.exports = router;
