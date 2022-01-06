const router = require("express").Router()
const { protect, userAuth } = require("../../utils/auth")
const controller = require("./link.controller")

router.use("/", protect)
router.all("/", userAuth)
router.get("/", controller.read)
router.post("/", [controller.validateCreate], controller.create)

module.exports = router
