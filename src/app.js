// node module imports
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

// my module imports
const config = require("./config")
const userRouter = require("./resources/user/user.router")
const linkRouter = require("./resources/link/link.router")
const clickRouter = require("./resources/click/click.router")

// initialization
const app = express()

// settings and configurations
app.disable("x-powered-by")
const port = config.PORT

// middlewares
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // dont log during testing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(config.dbURL)

// routes
app.use("/users", userRouter)
app.use("/links", linkRouter)
app.use("/clicks", clickRouter)

app.get("/", (req, res) => {
  res.json({ message: "hello" })
})

// run server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app // for testing
