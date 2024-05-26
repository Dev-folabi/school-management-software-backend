const mongoose = require('mongoose')

require('dotenv').config()
const dbURI = process.env.MONGODB_URL

const dbconnection = async ()=>{
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
}

module.exports = dbconnection
