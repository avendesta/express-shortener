const router = require("express").Router()
const { protect, userAuth } = require("../../utils/auth")
const controller = require("./link.controller")

router.use("/", protect)
router.use("/", userAuth)
router.post("/", controller.create)
router.get("/", controller.read)

module.exports = router
