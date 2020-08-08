const router = require('express').Router(),
      { Terms } = require('../db').models;

router.get('/', (req, res, next) => {
  Terms.findAll()
  .then(terms => res.send(terms))
  .catch(next);
});

router.post('/', (req, res, next) => {
  const { string, flags, markup } = req.body;

  Terms.create({ string, flags, markup })
  .then(term => res.send(term))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { string, flags, markup } = req.body.term;
  const id = req.params.id;

  Terms.update({ string, flags, markup }, { where: { id }})
  .then((updatedTerm) => {
    console.log("Updated term right?", updatedTerm);
    res.send(updatedTerm);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Terms.destroy({ where: { id }})
  .then(thing => res.send(id))
  .catch(next);
});

module.exports = router;