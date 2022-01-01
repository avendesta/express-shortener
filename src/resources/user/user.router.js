const router = require("express").Router()
const controller = require("./user.controller")
const { protect, adminAuth } = require("../../utils/auth")

router.use("/", protect)
router.use("/", adminAuth)
router.post("/", controller.create)
router.get("/", controller.read)
module.exports = router
