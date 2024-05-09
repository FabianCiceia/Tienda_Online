const Cart = require("../models/cart.model");

module.exports.findAllCarts = (req, res) => {
  Cart.find()
    .then(allDaCarts => res.json({ carts: allDaCarts }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleCart = (req, res) => {
	Cart.findOne({ _id: req.params.id })
		.then(oneSingleCart => res.json({ cart: oneSingleCart }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewCart = (req, res) => {
  Cart.create(req.body)
    .then(newlyCreatedCart => res.json({ cart: newlyCreatedCart }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingCart = (req, res) => {
  Cart.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedCart => res.json({ cart: updatedCart }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingCart = (req, res) => {
  Cart.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
