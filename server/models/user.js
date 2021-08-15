const mongoose = require('mongoose')

// create schema object from the mongoose
const schema = mongoose.Schema

const userSchema = new schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user',userSchema,'eventsCollection')