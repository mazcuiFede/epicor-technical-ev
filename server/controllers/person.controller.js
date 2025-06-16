const personService = require('../services/person.service');

async function getPeople(req, res) {
  const { sortBy } = req.query;

  try {
    const peopleList = await personService.getPeople(sortBy);
    res.json(peopleList);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getPeople,
};
