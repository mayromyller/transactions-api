import { app } from './app'
import { env } from './config/env/env'

app
	.listen({
		port: env.PORT
	})
	.then(() => {
		console.log('HTTP server running!')
	})
