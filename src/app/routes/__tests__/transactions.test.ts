import { it, describe, beforeAll, afterAll, expect } from 'vitest'

import supertest from 'supertest'
import { app } from '../../../app'

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a new transaction', async () => {
		await supertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 100,
				type: 'credit'
			})
			.expect(201)
	})

	it('should be able to list all transactions', async () => {
		const createTransactionResponse = await supertest(app.server).post('/transactions').send({
			title: 'New transaction',
			amount: 100,
			type: 'credit'
		})

		const cookieResponse = createTransactionResponse.get('Set-Cookie') as string[]

		const listTransactionsResponse = await supertest(app.server)
			.get('/transactions')
			.set('Cookie', cookieResponse)
			.expect(200)

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'New transaction',
				amount: 100
			})
		])
	})
})
