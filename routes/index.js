const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const NotFoundError = require("../utils/NotFoundError");

const { login, createUser } = require("../controllers/users");
const {
  validateCreateUser,
  validateUser,
} = require("../middlewares/validation");

router.post("/signin", validateUser, login);
router.post("/signup", validateCreateUser, createUser);

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found."));
});

module.exports = router;
