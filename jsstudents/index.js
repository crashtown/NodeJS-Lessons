const Sequelize = require('sequelize')

const con = new Sequelize(`
  postgres://ultra:password@localhost:5432/students
  `)

con.authenticate().then(() => {
  console.log('Connected!!!!')
}).catch(err => {
  console.error('Connection failed!:', err)
})

const User = con.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
})

User.sync({ force: true }).then(() => {
  console.log('Schema created!')
  return  User.create({
    firstName: 'Nic',
    lastName: 'Devlin'
  }).then (() => {
    console.log('User created!')
  }).then (() => {
    User.findAll().then( users => {
      console.log(users)
    })
  })
})
