const { sorter } = require('../utils');
const { default: axios } = require('axios');

const api = 'https://swapi.info/api';
const cache = {}; // cache not frozen for this file, but outputs to other files will be frozen

async function preloadCache() {
    await getResults(api + '/planets', 'planets');
}

async function getPlanets(sortBy, replacePeopleNames) {
    let planetList;

    if (replacePeopleNames) {
        planetList = await getPlanetsWithResidents();
    } else {
        const rootApi = api + '/planets';
        const cacheKey = 'planets';
        const planets = await getResults(rootApi, cacheKey);
        planetList = Object.values(planets);
    }

    if (sortBy) {
        sorter(sortBy, planetList);
    }

    return planetList;
}


async function getPlanetsWithResidents() {
    const [planets, people] = await Promise.all([
        getPlanets(),
        getPeople(),
    ]);
    // cheater way to deep clone an object
    const planetList = JSON.parse(JSON.stringify(Object.values(planets)));
    const peopleList = JSON.parse(JSON.stringify(Object.values(people)));

    planetList.forEach(planet => {
        planet.residents = planet.residents.map(url => {
            const person = peopleList.find(person => person.url === url) || {};
            return person.name || 'unknown';
        });
    });

    return planetList;
}


/* helper methods */
async function getResults(rootApi, cacheKey) {
    const startTime = performance.now();

    if (!cache[cacheKey]) {
        cache[cacheKey] = {};
    }

    // Si no hay datos en caché, obtenerlos desde la API
    if (Object.keys(cache[cacheKey]).length === 0) {
        try {
            const { data } = await axios.get(rootApi);

            const mappedData = data.map(item => {
                const id = item.url.replace(rootApi, '').replace(/\//g, '');
                const numericId = parseInt(id);
                item.id = numericId;
                cache[cacheKey][numericId] = item;
                return item;
            });

            const frozenResult = Object.freeze(cache[cacheKey]);
            console.log(`"${cacheKey}" | fetched from API | time: ${Math.round(performance.now() - startTime)}ms | count: ${mappedData.length}`);
            return frozenResult;

        } catch (error) {
            console.error(`Error fetching data from ${rootApi}:`, error);
            throw error;
        }
    }

    const toReturn = Object.freeze(cache[cacheKey]);
    console.log(`"${cacheKey}" | time: ${Math.round(performance.now() - startTime)}ms | count: ${Object.keys(toReturn).length}`);
    return toReturn;
}


module.exports = {
    getPlanets,
    preloadCache
};