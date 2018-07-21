import mongoose from "mongoose"

async function createConnection() {
  mongoose.Promise = Promise

  // Don't forget to add a user for this connection
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/twi-test",
    {
      promiseLibrary: Promise,
      useNewUrlParser: true
    }
  )

  return connection
}

async function closeConnection() {
  return await mongoose.disconnect()
}

export {
  createConnection,
  closeConnection
}
