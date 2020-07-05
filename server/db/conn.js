Sequelize = require('sequelize');
// const conn = new Sequelize('sqlite::memory:');
const conn = new Sequelize('sqlite:./np.db');

module.exports = conn;