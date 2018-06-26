const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const Students = require('./db')

app.use(bodyParser.json())
app.use('/api', cors())

app.get('/api/students', (req, res) => {
    Students.find().then((students) => res.send(students))    
})

app.post('/api/students', (req, res) => {
    
    const newStudent = new Students({
        name: req.body.studentname,        
    })
    newStudent.save().then(() => {
        res.end()
    }).catch(err => {
        res.send(err)
    })
})

app.listen(8080, () => console.log('Accepting incoming connections on port TCP 8080.'))
