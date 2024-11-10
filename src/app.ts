import fastify from 'fastify'
import cookie, { type FastifyCookieOptions } from '@fastify/cookie'
import { transactionsRoutes } from './app/routes/transactionsRoutes'

export const app = fastify()

app.register(transactionsRoutes, {
	prefix: '/transactions'
})

app.register(cookie, {
	secret: 'api-rest-nodejs',
	parseOptions: {}
} as FastifyCookieOptions)
