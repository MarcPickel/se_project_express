const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

router.use("/", userRouter);
router.use("/", itemRouter);

module.exports = router;
