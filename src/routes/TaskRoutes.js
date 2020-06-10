const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController");
const TaskValidation = require("../middlewares/TaskValidation");

router.post("/", TaskValidation, TaskController.create);
router.put("/:id", TaskValidation, TaskController.update);
router.get("/:id", TaskController.show);
router.delete("/:id", TaskController.delete);
router.put("/:id/:done", TaskController.done);

router.get("/filter/all", TaskController.all);
router.get("/filter/dones", TaskController.dones);
router.get("/filter/unlock", TaskController.unlock);
router.get("/filter/validate", TaskController.validate);
router.get("/filter/activate", TaskController.activate);
router.get("/filter/authorize", TaskController.authorize);

module.exports = router;
