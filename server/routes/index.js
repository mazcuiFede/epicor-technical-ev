const router = require('express').Router();


router.use('/people', require('./person.routes'));
router.use('/planets', require('./planet.routes'));
router.get('/*', render404);

module.exports = router;

function render404(req, res) {
  res.status(404).json({ error: 'not found' });
}