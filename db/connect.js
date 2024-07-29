const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(console.log('MongoDB Connected...'))
    .catch((err) => console.log(`Something went wrong with the server ${err}`))
}

module.exports = connectDB
