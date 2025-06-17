import express from 'express';
const router = express.Router();

import * as personController from '../controllers/person.controller.js';

router.get('/', personController.getPeople);

export default router;


