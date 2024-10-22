import fastify from 'fastify'
import cookie, { type FastifyCookieOptions } from '@fastify/cookie'

import { env } from './config/env/env'

import { transactionsRoutes } from './app/routes/transactionsRoutes'

const app = fastify()

app.register(cookie, {
	secret: 'api-rest-nodejs',
	parseOptions: {}
} as FastifyCookieOptions)

app.register(transactionsRoutes, {
	prefix: '/transactions'
})

app
	.listen({
		port: env.PORT
	})
	.then(() => {
		console.log('HTTP server running!')
	})
