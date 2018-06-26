const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost/students')

const Students = mongoose.model('Students', { 
    name: String
})

module.exports = Students