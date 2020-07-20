const conn = require('./conn'),
      Terms = require('./Terms'),
      Groups = require('./Groups'),
      seed = require('./seed');

Groups.hasMany(Terms);
Terms.belongsTo(Groups);

module.exports = {
  conn,
  seed,
  models: {
    Terms,
    Groups
  }
}