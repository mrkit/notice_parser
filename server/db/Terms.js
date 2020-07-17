const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Terms = conn.define('Terms', {
  string: {
    type: Sequelize.TEXT,
    // allowNull: false //turn on for production
  },
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