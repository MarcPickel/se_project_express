const Item = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  orFailHandler,
} = require("../utils/errors");

const getItem = (req, res) => {
  Item.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};
const createItem = (req, res) => {
  console.log(req.user._id);
  const { name, weather, imageUrl, owner, likes, createdAt } = req.body;

  Item.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .orFail(() => {
      orFailHandler();
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

// Functions for Likes
const likeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      orFailHandler();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      orFailHandler();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports = { getItem, createItem, deleteItem, likeItem, dislikeItem };
