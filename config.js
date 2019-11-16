const env = process.env.NODE_ENV || 'development';

const defaultConfig = {
  port: process.env.PORT || 3000,
  root: './',
  isDev: env === 'development',
  env,
  api: {
    version: '1',
    secret: 'J4JkJBHBqYh2Aa,#u6}[G=W3yZ}(VR',
  },
};

const config = {
  development: {
    ...defaultConfig,
    db: process.env.DATABASE_URL,
  },
  production: {
    ...defaultConfig,
    db: process.env.DATABASE_URL,
  },
};

export default config[env];
