const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);
router.put("/:id", TaskController.deleted);
router.get("/:id", TaskController.show);

router.get("/filter/all", TaskController.all);

module.exports = router;
