const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  orFailHandler,
} = require("../utils/errors");

const getItem = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      } else {
        return res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      orFailHandler();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      } else if ((err.statusCode = NOT_FOUND_ERROR_CODE)) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        return res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: DEFAULT_ERROR_MESSAGE });
      }
    });
};

// Functions for Likes
const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
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
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      } else if ((err.statusCode = NOT_FOUND_ERROR_CODE)) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        return res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: DEFAULT_ERROR_MESSAGE });
      }
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
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
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      } else if ((err.statusCode = NOT_FOUND_ERROR_CODE)) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        return res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: DEFAULT_ERROR_MESSAGE });
      }
    });
};

module.exports = { getItem, createItem, deleteItem, likeItem, dislikeItem };
