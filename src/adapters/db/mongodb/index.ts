import mongodb from 'mongodb'
import debug from 'debug'
import * as repo from './repository'

export const repository = repo

export const getConnection = (config) => {
  if (!config.dbUri) {
    throw new Error('Invalid mongodb uri')
  }
  if (!config.dbName) {
    throw new Error('Invalid mongodb database name')
  }
  return new Promise((resolve, reject) => {
    mongodb.connect(config.dbUri, (err, client) => {
      if (err) {
        return reject(err)
      }
      debug('app:info:db:mongo')(`Connected to mongodb instance on ${config.dbUri}`)
      return resolve({
        client,
        db: client.db(config.dbName)
      })
    })
  })
}

export const closeConnection = (connection) => {
  connection.client.close()
}
