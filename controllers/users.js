const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  orFailHandler,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      orFailHandler();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const createUser = (req, res) => {
  const { name, email, avatar } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then(User.create({ name, email, password: hash, avatar }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.code === 11000) {
        return res.status(CONFLICT_ERROR).send({ message: err.message });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = { getUsers, getUser, createUser, login };
