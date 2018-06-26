const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./db.js')

const app = express()

// Tell passport to use the strategy for our User Model.
passport.use(User.createStrategy())


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Use body parser for POST requests
app.use(bodyParser.json())

app.use(session({
   secret: 'imaretpally',
   resave: false,
   saveUninitialized: false
}))

//Initialize passport and connect it to the session
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send(`You are logged ${req.user ? 'in as '+JSON.stringify(req.user) : 'out'}`)
})

app.post('/register', (req, res) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        }
        //Registration successful, user now exists in db with hashed pw

        // Log the new user in
        const fn = passport.authenticate('local')
        
        fn(req, res, () => {
            res.redirect('/')
        })
    })
})

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.logout()
})

app.listen(8080, () => console.log('Listening on port 8080.'))