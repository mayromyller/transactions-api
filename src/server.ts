import fastify from 'fastify'
import { knex } from './config/knexConfig'
import { env } from './config/env/env'

import { transactionsRoutes } from './app/routes/transactionsRoutes'

const app = fastify()

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
