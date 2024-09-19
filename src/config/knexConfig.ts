import 'dotenv/config'

import { knex as knexInstance, type Knex } from 'knex'

if(!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL dot env variable is not supported')
}

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: process.env.DATABASE_URL
	},
	migrations: {
		extension: 'ts',
		directory: './database/migrations'
	},
	useNullAsDefault: true
}

export const knex = knexInstance(knexConfig)
