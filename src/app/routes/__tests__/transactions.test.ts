import { it, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest'

import { execSync } from 'node:child_process'

import supertest from 'supertest'
import { app } from '../../../app'

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	beforeEach(() => {
		execSync('npx knex migrate:rollback --all')
		execSync('npx knex migrate:latest')
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

	it('should be able to get the summary', async () => {
		const createTransactionResponse = await supertest(app.server).post('/transactions').send({
			title: 'Credit transaction',
			amount: 100,
			type: 'credit'
		})

		const cookieResponse = createTransactionResponse.get('Set-Cookie') as string[]

		await supertest(app.server).post('/transactions').set('Cookie', cookieResponse).send({
			title: 'debit transaction',
			amount: 50,
			type: 'debit'
		})

		const summaryResponse = await supertest(app.server)
			.get('/transactions/summary')
			.set('Cookie', cookieResponse)
			.expect(200)

		expect(summaryResponse.body.summary).toEqual({
			amount: 50
		})
	})
	it('should be able to list a specific transaction', async () => {
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

		const transactionId = listTransactionsResponse.body.transactions[0].id

		const getTransactionResponse = await supertest(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookieResponse)
			.expect(200)

		expect(getTransactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: 'New transaction',
				amount: 100
			})
		)
	})
})
