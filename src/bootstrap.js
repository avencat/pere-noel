import bodyparser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import glob from 'glob';

import client from './db';

function loadProject(app, config) {
  const controllers = glob.sync('routes/*.js');
  controllers.forEach(file => require(`${config.root}${file}`).default(app));
}

function init(app, config) {
  app.use(cors());
  app.use(compression());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  try {
    client.connect();

    /* files loader */
    loadProject(app, config);
  } catch (e) {
    config.isDev && console.log(e);
  }

  return app;
}

export default init;
