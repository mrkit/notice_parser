const conn = require('./conn'),
      Sequelize = conn.Sequelize;

const Groups = conn.define('Groups', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'default'
  }
});

module.exports = Groups;