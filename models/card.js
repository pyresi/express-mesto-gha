const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    requited: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
