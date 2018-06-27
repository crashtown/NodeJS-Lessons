const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();
const Product = require('../models/product.js')

const { requireJwt, register, signJwtForUser, login, isAdmin } = require('../middleware/auth')

router.get('/', (req, res) => {
  res.send('Anyone can view this page!')
})

router.get('/protected', requireJwt, (req, res) => {
  res.send('You have a valid token!')
})

router.get('/admin', requireJwt, isAdmin, (req, res) => {
  res.send("You're an admin!")
})
router.post('/register', register, signJwtForUser)

router.post('/login', login, signJwtForUser)

//Challenge mode, products routes

router.get('/products', (req, res) => {
  let allProducts = Product.find(function (err, products) {
    if (err) {
      return console.error(err);
    } else {
      res.json(products);
    }
  })
})

router.post('/products', requireJwt, isAdmin, (req, res) => {
  const newProduct = new Product({ title: req.body.title, description: req.body.description, price: req.body.price });
  newProduct.save(function (err) {
    if (err) return console.log(err);
  });
  res.send(`You're an admin, and you added a product called ${req.body.title}!`)
})

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
//
module.exports = router;
