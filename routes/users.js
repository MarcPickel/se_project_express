const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const { validateUserId } = require("../middlewares/validation");

router.use(auth);

router.get("/me", validateUserId, getCurrentUser);

router.patch("/me", validateUserId, updateUser);

module.exports = router;
