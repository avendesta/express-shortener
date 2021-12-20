const router = require("express").Router()
const controller = require("./admin.controller")

router.route("/users").post(controller.create).get(controller.read)
router.route("/users/:userId").get(controller.readOne)

module.exports = router
