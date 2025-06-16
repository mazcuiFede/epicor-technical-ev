const express = require('express');
const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config.js');
const { preloadAllCaches } = require('./services/cache.service');
const routes = require('./routes');

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
