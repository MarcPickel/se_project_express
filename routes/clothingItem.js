const router = require("express").Router();
const {
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/items", getItem);

router.post("/items", createItem);

router.delete("/items/:itemId", deleteItem);

// Routes for Likes
router.put("/items/:itemId/likes", likeItem);

router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
