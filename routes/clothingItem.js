const router = require("express").Router();
const {
  getItem,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/items", getItem);

router.post("/items", createItem);

router.delete("/items/:ItemId", deleteItem);

module.exports = router;
