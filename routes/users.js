const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const { validateId } = require("../middlewares/validation");

router.use(auth);

router.get("/me", validateId, getCurrentUser);

router.patch("/me", validateId, updateUser);

module.exports = router;
