const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getMenu);
router.post("/", menuController.createMenuItem);
router.put("/:id", menuController.updateMenuItem);    // ← must be here
router.delete("/:id", menuController.deleteMenuItem); // ← must be here

module.exports = router;