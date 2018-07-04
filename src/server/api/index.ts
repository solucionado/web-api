import Koa from 'koa'
import koaBody from 'koa-body'
import http from 'http'
import debug from 'debug'

import responseMiddleware from './middlewares/response'
import loggerMiddleware from './middlewares/logger'
import errorMiddleware from './middlewares/error'
import authMiddleware from './middlewares/authentication'

import accountsRouter from './routes/accounts'
import { Services } from '../../application'

export const api = (config, services: Services) => {
  const app = new Koa()

  {
    [
      // Middlewares
      (app) => app.use(koaBody()),
      loggerMiddleware,
      responseMiddleware,
      errorMiddleware,
      authMiddleware,

      // Routes
      accountsRouter
    ]
    .forEach(fn => {
      fn && fn(app, services)
    })
  }
  return app
}

export const runApiHttpServer = async (config: any, services?: Services) => {
  if (!config.port && (process.env.NODE_ENV === 'test' && config.port !== 0)) {
    throw new Error('The http server must be started with an available port')
  }
  if (!services) {
    throw new Error('The http server must be started with a valid core services')
  }
  return new Promise((resolve, reject) => {
    const server = http.createServer(api(config, services).callback())
    server.on('error', err => reject(err))
    server.on('listening', () => {
      const address: any = server.address()
      debug('app:info:http')(`Http service ready on port: ${address.port}`)
      resolve(server)
    })
    server.listen(config.port)
  })
}

export default api
