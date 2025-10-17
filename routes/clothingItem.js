const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItem);

router.use(auth);

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

// Routes for Likes
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
