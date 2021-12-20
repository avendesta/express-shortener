const router = require("express").Router()
const controller = require("./link.controller")

router.route("/").post(controller.create).get(controller.read)

module.exports = router
