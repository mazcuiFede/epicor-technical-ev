import express from 'express';
import personRoutes from './person.routes.js';
import planetRoutes from './planet.routes.js';

const router = express.Router();
router.use('/people', personRoutes);
router.use('/planets', planetRoutes);
router.get('/*', render404);

function render404(req, res) {
  res.status(404).json({ error: 'not found' });
}

export default router;