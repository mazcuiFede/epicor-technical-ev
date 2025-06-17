import { preloadCache as personPreloadCache } from './person.service.js';
import { preloadCache as planetPreloadCache } from './planet.service.js';

async function preloadAllCaches() {
    console.log('Loading people cache...');
    await personPreloadCache();

    console.log('Loading planets cache...');
    await planetPreloadCache();
}

export default preloadAllCaches