import * as personService from '../services/person.service.js';

async function getPeople(req, res) {
  const { sortBy } = req.query;

  try {
    const peopleList = await personService.getPeople(sortBy);
    res.json(peopleList);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export {
  getPeople,
};
