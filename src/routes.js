let express = require("express");

let router = express.Router();

let controller = require("./controller");

//route to get all the todo items
router.get("/moodvies", controller.listEntries);

//route to get item by id
router.get("/moodvies/:id", controller.getEntry);

//route to delete item
router.delete("/moodvies/:id", controller.deleteEntry);

//route to add item
router.post("/moodvies", controller.addEntry);


//route to update item
router.put("/moodvies/:id", controller.updateEntry);

module.exports = router;