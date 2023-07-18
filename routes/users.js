const router = require('express').Router(); // создали роутер
const {
  getUsers,
  getUserById,
  createUser,
  modifyUser,
  modifyUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', modifyUser);
router.patch('/me/avatar', modifyUserAvatar);

module.exports = router;
