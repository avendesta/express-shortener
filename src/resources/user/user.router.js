const router = require("express").Router()
const controller = require("./user.controller")
const { protect, adminAuth, signIn } = require("../../utils/auth")

router.post("/login", signIn)
router.use("/", protect)
router.use("/", adminAuth)
router.post("/", controller.create)
router.get("/", controller.read)
module.exports = router
