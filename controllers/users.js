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

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
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
      if (err.status === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      orFailHandler();
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.status === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }
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

const createUser = (req, res) => {
  const { name, email, password, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash, avatar }))
    .then((user) => {
      const safeUser = user.toObject();
      delete safeUser.password;
      return res.status(201).send(safeUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR)
          .send({ message: "Email already exists" });
      } else if (err.name === "ValidationError") {
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
      console.error(err);
      console.log(err.name);
      if (err.status === "ValidationError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }
      return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = { getUsers, getCurrentUser, updateUser, createUser, login };
