// node module imports
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

// my module imports
const config = require("./config")
const userRouter = require("./resources/user/user.router")
const linkRouter = require("./resources/link/link.router")

// initialization
const app = express()

// settings and configurations
app.disable("x-powered-by")
const port = config.PORT

// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(config.dbURL)

// routes
app.use("/user", userRouter)
app.use("/link", linkRouter)
app.get("/", (req, res) => {
  res.json({ message: "hello" })
})

// run server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app // for testing
