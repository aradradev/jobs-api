const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(console.log('MongoDB Connected...'))
    .catch((err) => console.log(`Something went wrong with the server ${err}`))
}

module.exports = connectDB
