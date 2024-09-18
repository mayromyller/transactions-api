import { knex as knexInstance } from 'knex'

export const knex = knexInstance({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
});