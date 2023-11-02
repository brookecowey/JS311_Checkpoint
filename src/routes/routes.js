let express = require("express");

let router = express.Router();

let controller = require("../controllers/controller");

let authController = require("../controllers/authController")

//route to get all the items
router.get("/moodvies", controller.listEntries);

router.get("/moodvies/:userId", controller.listUserIdEntries);

//route to get item by id
router.get("/moodvies/:id", controller.getEntry);

// //route to delete item
// router.delete("/moodvies/:id", controller.deleteEntry);

//route to add a new mood to get a movie suggestion
router.post("/moodvies", controller.addEntryByUserID);

//route to update item
// router.put("/moodvies/:id", controller.updateEntry);

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

module.exports = router;