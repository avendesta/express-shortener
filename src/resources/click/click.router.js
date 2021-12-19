const router = require("express").Router()
const controller = require("./click.controller")

router.route("/").post(controller.addSample).get(controller.getSample)

module.exports = router
