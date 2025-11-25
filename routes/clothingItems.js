const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateCreateItem, validateId } = require("../middlewares/validation");

router.get("/", getItem);

router.use(auth);

router.post("/", validateCreateItem, createItem);

router.delete("/:itemId", validateId, deleteItem);

// Routes for Likes
router.put("/:itemId/likes", validateId, likeItem);

router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
