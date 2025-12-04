const ClothingItem = require("../models/clothingItem");
const {
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  orFailHandler,
} = require("../utils/errors");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

const getItem = (req, res, next) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const userId = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      console.log("Logging item", item);
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      orFailHandler();
    })
    .then((item) => {
      if (userId.toString() === item.owner.toString()) {
        return ClothingItem.findByIdAndDelete(itemId);
      }
      const error = new Error("Forbidden");
      error.status = FORBIDDEN_ERROR_CODE;
      return Promise.reject(error);
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.status === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError("Invalid data"));
      }
      if (err.status === FORBIDDEN_ERROR_CODE) {
        next(new ForbiddenError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// Functions for Likes
const likeItem = (req, res, next) => {
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
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.status === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
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
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.status === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = { getItem, createItem, deleteItem, likeItem, dislikeItem };
