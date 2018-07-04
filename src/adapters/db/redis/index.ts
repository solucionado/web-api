import redis from 'redis'
import debug from 'debug'

import * as repo from './repository'

export const repository = repo

export const getConnection = (config) => {
  return new Promise((resolve, reject) => {
    if (config.instance) {
      return resolve(config.instance)
    }
    const client = redis.createClient(config.dbUri)
    client.on('ready', () => {
      debug('app:info:db:redis')(`Connected to redis instance on ${config.dbUri}`)
      resolve(client)
    })
    client.on('error', err => reject(err))
  })
}

export const closeConnection = (client) => {
  client.quit()
}
