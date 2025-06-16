const router = require('express').Router();
const planetController = require('../controllers/planet.controller');

router.get('/', planetController.getPlanets);

module.exports = router;
