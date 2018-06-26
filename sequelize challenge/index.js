const Sequelize = require('sequelize')

const con = new Sequelize('postgres://ultra:password@localhost:5432/students');

con.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).then(() => {
    const Bookmark = con.define('book', {
  url: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
  Bookmark.sync({force: true}).then(() => {
  // Table created
  return Bookmark.create({
    url: 'http://www.google.com',
    title: 'Google'
  });
});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
