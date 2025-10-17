const router = require("express").Router();
const {
  login,
  createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", createUser);

router.post("/signin", login);

router.use(auth);

router.get("/me", getCurrentUser);

router.patch("/me", updateUser);

module.exports = router;
