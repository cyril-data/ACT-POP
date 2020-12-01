const express = require("express");
const router = express.Router();
const ActPopCtrl = require("../controllers/actPop");
const auth = require("../middleware/auth");

router.get("/", ActPopCtrl.getAllActPop);
router.post("/creation", auth, ActPopCtrl.createActPop);
router.get("/:id", ActPopCtrl.getOneActPop);
// router.put("/:id", ActPopCtrl.modifyActPop);
// router.delete("/:id", ActPopCtrl.deleteActPop);

module.exports = router;
