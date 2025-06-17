import * as planetController from '../controllers/planet.controller.js';
import express from 'express';

const router = express.Router();

router.get('/', planetController.getPlanets);

export default router;
