const mongoose = require('mongoose')
const passport = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/encryp')

//Create user schema
const user_schema = new mongoose.Schema({})

user_schema.plugin(passport, { usernameField: 'email'})

console.log(user_schema)

//Create a user model from the schema
module.exports = mongoose.model('User', user_schema)

