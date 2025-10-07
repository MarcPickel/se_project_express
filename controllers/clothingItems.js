const Item = require("../models/clothingItem");

const getItem = (req, res) => {
  Item.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err });
    });
};
const createItem = (req, res) => {
  const { name, weather, imageUrl, owner, likes, createdAt } = req.body;

  Item.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err });
    });
};

module.exports = { getItem, createItem, deleteItem };
