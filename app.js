const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('tiny'))

mongoose.connect('mongodb://localhost:27017/express-todo?readPreference=primary&appname=MongoDBCompass&directConnection=true&ssl=false')
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

const productModel = mongoose.model('Product', productSchema)

const p1 = new productModel({
    _id: new mongoose.Types.ObjectId(),
    name: "Winter Jacket",
    price: 33
})

p1.save().then(r => console.log(r)).catch(e => console.error("Error ",e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})