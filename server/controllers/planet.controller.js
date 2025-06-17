import * as planetService from '../services/planet.service.js';

async function getPlanets(req, res) {
  const {
    sortBy,
    replacePeopleNames = 'true',
  } = req.query;

  try {
    const planetList = await planetService.getPlanets(sortBy, replacePeopleNames === 'true');
    res.json(planetList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export {
  getPlanets,
};