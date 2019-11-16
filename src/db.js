import { Client } from 'pg';

import config from './config';

export default new Client({ connectionString: config.db, ssl: true });
