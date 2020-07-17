const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Terms = conn.define('Terms', {
  string: Sequelize.TEXT,
  flags:  {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  markup: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
});

module.exports = Terms;