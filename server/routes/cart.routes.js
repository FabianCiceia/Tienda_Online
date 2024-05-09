const UserController = require("../controllers/cart.controller");

module.exports = app => {
    app.get("/", UserController.findAllUsers);
    app.get("/:id", UserController.findOneSingleUser);
    app.put("/update/:id", UserController.updateExistingUser);
    app.post("/new", UserController.createNewUser);
    app.delete("/delete/:id", UserController.deleteAnExistingUser);
};