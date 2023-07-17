const router = require("express").Router(); // создали роутер
const {
  getUsers,
  getUserById,
  createUser,
  modifyUser,
  modifyUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUser);
router.patch("/users/me", modifyUser);
router.patch("/users/me/avatar", modifyUserAvatar);

module.exports = router;
