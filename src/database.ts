import { env } from './env';
import knex, { type Knex } from 'knex';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL env not found');

export const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
};

export const knexConfig = knex(config);
