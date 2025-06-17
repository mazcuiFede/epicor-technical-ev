import axios from 'axios';

export default {
  getPlanets,
  getPeople,
};

function getPlanets() {
  try {
    return axios.get('/api/starWars/planets', {
      params: {
        sortBy: 'name',
        replacePeopleNames: false,
      }
    });
  }
  catch (error) {
    // implement logger library or send alarm
    console.error('Error fetching planets:', error);
    return [];
  }
}

function getPeople() {
  try {
    return axios.get('/api/starWars/people', {
      params: {
        sortBy: 'name',
      }
    });
  } catch (error) {
    // implement logger library or send alarm
    console.error('Error fetching people:', error);
    return [];
  }

}
