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

router.post("/", auth, createItem);

router.delete("/:itemId", auth, deleteItem);

// Routes for Likes
router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
