import type { FastifyInstance } from 'fastify'

import { knex } from '../../config/knexConfig'

export async function transactionsRoutes(app: FastifyInstance) {
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
}
