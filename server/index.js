import express from 'express';
import webpack from 'webpack';
import historyApiFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';

import preloadAllCaches from './services/cache.service.js'

import routes from './routes/index.js';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

(async () => {
  try {
    console.log('Loading Star Wars Cache...');
    await preloadAllCaches();

    // Usar rutas de Express
    app.use('/api/starwars', routes);

    // if not found in routes, use history fallback api
    // (redirect to browser so react-router can pick it up)
    app.use(historyApiFallback());

    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
    app.listen(port, function () {
      console.log(`express listening on port ${port}\n`);
    });

  } catch (error) {
    console.error('❌ Error loading the app:', error);
    process.exit(1);
  }
})();
