const router = require("express").Router()
const controller = require("./admin.controller")

router.route("/users").post(controller.create).get(controller.read)

module.exports = router
