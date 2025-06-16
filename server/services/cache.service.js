const personService = require('./person.service');
const planetService = require('./planet.service');

async function preloadAllCaches() {
    console.log('Loading people cache...');
    await personService.preloadCache();

    console.log('Loading planets cache...');
    await planetService.preloadCache();
}

module.exports = {
    preloadAllCaches,
}