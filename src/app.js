import express from 'express';
import config from './config';
import init from './bootstrap';

const app = init(express(), config);

app.listen(config.port, () => {
  config.isDev && console.info(`Express server listening on port ${config.port}`);
});
