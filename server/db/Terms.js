const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Terms = conn.define('Terms', {
  term: Sequelize.TEXT
});

module.exports = Terms;