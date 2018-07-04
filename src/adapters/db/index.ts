import * as mongodb from './mongodb'
import * as redis from './redis'

export default {
  mongodb: mongodb.repository,
  redis: redis.repository
}

export const createDbConnections = async (config) => {
  return {
    mongodb: await mongodb.getConnection(config.mongodb),
    redis: await redis.getConnection(config.redis)
  }
}

export const closeDbConnections = async (db) => {
  if (db.mongodb) mongodb.closeConnection(db.mongodb)
  if (db.redis) redis.closeConnection(db.redis)
}
