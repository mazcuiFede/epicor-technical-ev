const planetService = require('../services/planet.service');

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

module.exports = {
  getPlanets,
};