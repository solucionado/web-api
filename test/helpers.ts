import App from '../src/application'
import { MongoMemoryServer } from 'mongodb-memory-server'
import redis from 'redis-mock'
import uuid from 'uuid/v4'

export const beforeEach = async (context: any) => {
  // Start mongodb daemon
  const mongod = new MongoMemoryServer()
  const dbUri = await mongod.getConnectionString()
  const dbName = 'test-db-' + uuid()

  // Configure test app
  context.application = new App({
    db: {
      mongodb: {
        dbUri,
        dbName
      },
      redis: {
        instance: redis.createClient()
      }
    },
    api: {
      port: 0
    }
  })

  // Start app
  await context.application.start()

  const { port } = context.application.server.http.address()
  context.apiUrl = `http://localhost:${port}`

  return context
}
export const afterEach = async (context: any) => {
  await context.application.close()
  return context
}

const execRequest = async (fn, url, payload, cb, options) => {
  try {
    let result = await fn(url, {
      ...options,
      body: payload
    })
    return cb(null, result)
  } catch (err) {
    return cb(err)
  }
}

export const tryPayload = (fn, url, payloads) =>
  Promise.all(payloads.map(async (payload) => {
    const cb = payload[1] && typeof (payload[1]) === 'function' ? payload[1] : () => {}
    const options = payload[2] || { json: true }
    if (Array.isArray(payload[0])) {
      await Promise.all(payload[0].map(async (p) => {
        await execRequest(fn, url, p, cb, options)
      }))
      return
    }
    await execRequest(fn, url, payload[0], cb, options)
  }))
