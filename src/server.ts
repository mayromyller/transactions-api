import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './config/knexConfig'
import { env } from './config/env/env'

const app = fastify()

app.get('/hello', async () => {
	const transaction = await knex('transactions')
		.insert({
			id: crypto.randomUUID(),
			title: 'Teste',
			amount: 100.0
		})
		.returning('*')

	return transaction
})

app.get('/transactions', async () => {
	const transactions = await knex('transactions').select('*')

	return transactions
})

app
	.listen({
		port: env.PORT
	})
	.then(() => {
		console.log('HTTP server running!')
	})
