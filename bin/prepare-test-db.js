const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  if (!process.env.TEST_MONGO_DB_URI && !process.env.DOCKER_BUILD) {
    const mongod = new MongoMemoryServer()
    await mongod.getConnectionString()
    await mongod.stop()
  }
})()
  .catch((err) => {
    console.error('Cannot get mongodb-memory-server binary', err)
    process.exit(1)
  })