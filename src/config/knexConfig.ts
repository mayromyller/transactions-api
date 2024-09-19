import { knex as knexInstance, type Knex } from 'knex'
import { env } from './env/env'

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: env.DATABASE_URL
	},
	migrations: {
		extension: 'ts',
		directory: './database/migrations'
	},
	useNullAsDefault: true
}

export const knex = knexInstance(knexConfig)
