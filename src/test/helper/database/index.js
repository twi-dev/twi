import mongoose from "mongoose"

async function createConnection() {
  mongoose.Promise = Promise

  const conn = await mongoose.connect("mongodb://localhost/twi-test", {
    useMongoClient: true,
    promiseLibrary: Promise
  })

  // Clean each collection if it's not
  const queue = []
  for (const collection of Object.values(conn.collections)) {
    queue.push(collection.remove())
  }

  await Promise.all(queue)

  return conn
}

async function closeConnection() {
  return await mongoose.connection.db.dropDatabase()
}

export {
  createConnection,
  closeConnection
}
