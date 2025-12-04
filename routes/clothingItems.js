const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getItem);

router.use(auth);

router.post("/", validateCreateItem, createItem);

router.delete("/:itemId", validateItemId, deleteItem);

// Routes for Likes
router.put("/:itemId/likes", validateItemId, likeItem);

router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
