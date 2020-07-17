const conn = require('./conn'),
      Terms = require('./Terms'),
      Groups = require('./Groups');

Groups.hasMany(Terms);
Terms.belongsTo(Groups);

module.exports = {
  conn,
  models: {
    Terms,
    Groups
  }
}