const router = require('express').Router();
const personController = require('../controllers/person.controller');

router.get('/', personController.getPeople);

module.exports = router;


