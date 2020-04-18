const express = require("express");
const router = express.Router();
const LutteCtrl = require("../controllers/lutte");
const auth = require("../middleware/auth");

router.get("/", LutteCtrl.getAllLutte);
router.post("/creation", auth, LutteCtrl.createLutte);
router.get("/:id", LutteCtrl.getOneLutte);
// router.put("/:id", LutteCtrl.modifyLutte);
// router.delete("/:id", LutteCtrl.deleteLutte);

module.exports = router;
