const { Terms } = require('../db').models;

function parser(data){
  let output = data

  return Terms.findAll()
  .then(terms => {
    terms.forEach(term => {
      output = output.replace(new RegExp(term.string, term.flags), term.markup);
    });
  })
  .then(() => output)
  .catch(err => console.error(`Parser Function Error = ${err.message}`));
}

module.exports = parser