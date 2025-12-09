const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  orFailHandler,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require("../utils/errors");
const BadRequestError = require("../utils/BadRequestError");
const ConflictError = require("../utils/ConflictError");
const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);

  User.findById(_id)
    .orFail(() => {
      orFailHandler();
    })
    .then((user) => res.status(200).send(user))
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

const updateUser = (req, res, next) => {
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
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.status === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError("Invalid data"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
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
      if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ user, token });
    })
    .catch((err) => {
      if (err.status === UNAUTHORIZED_ERROR_CODE) {
        next(new UnauthorizedError("Authorization required"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, updateUser, createUser, login };
