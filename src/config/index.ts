import debug from 'debug'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (!process.env.DEBUG) {
  debug.enable('app:*')
}

export const api = {
  port: process.env.NODE_PORT || process.env.PORT || 3000
}

export const db = {
  mongodb: {
    dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'testing'
  },
  redis: {
    dbUri: process.env.REDIS_URI || 'redis://localhost:6379'
  }
}
