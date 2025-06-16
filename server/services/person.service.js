const { sorter } = require('../utils');
const { default: axios } = require('axios');

const api = 'https://swapi.info/api';
const cache = {}; // cache not frozen for this file, but outputs to other files will be frozen

async function preloadCache() {
    await getResults(api + '/people', 'people');
}

async function getPeople(sortBy) {
    const rootApi = api + '/people';
    const cacheKey = 'people';
    const people = await getResults(rootApi, cacheKey);
    const peopleList = Object.values(people);

    if (sortBy) {
        sorter(sortBy, peopleList);
    }

    return peopleList;
}

/* helper methods */
async function getResults(rootApi, cacheKey) {
    const startTime = new Date().valueOf();

    if (!cache[cacheKey]) {
        cache[cacheKey] = {};
    }


    async function getPage(nextPage, skipNext = true) {
        const { data } = await axios.get(nextPage);
        data.forEach(item => {
            const id = item.url.replace(rootApi, '').replace(/\//g, '');
            item.id = parseInt(id); // make things easier for the front-end
            cache[cacheKey][id] = item;
        });

        return data;

    }

    if (Object.keys(cache[cacheKey]).length === 0) {
        await getPage(rootApi, false);
    } else {
        console.log(`"${cacheKey}" | pulling from existing cache`);
    }

    // return as frozen object so any mutating won't affect the cache in this file
    const toReturn = Object.freeze(cache[cacheKey]);
    console.log(`"${cacheKey}" | timing: ${new Date().valueOf() - startTime} | result count: ${Object.values(toReturn).length}`);
    return toReturn;
}



module.exports = {
    getPeople,
    preloadCache
};