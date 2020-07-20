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

module.exports = router;