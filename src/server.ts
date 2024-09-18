import fastify from 'fastify'
import { knex } from './config/knexConfig'

const app = fastify()

app.get('/hello', async () => {
	const testingDB = await knex('sqlite_schema').select('*')

	return testingDB
})

app
	.listen({
		port: 8000
	})
	.then(() => {
		console.log('HTTP server running!')
	})
