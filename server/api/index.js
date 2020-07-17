const router = require('express').Router();

router.use('/terms', require('./terms'));
router.use('/parser', require('./parser'));

module.exports = router;