import mongoose from "mongoose"

mongoose.Promise = Promise

async function createConnection(config = {}) {
  const replicaUri = `${config.host}:${config.port}/${config.name}`

  return await mongoose.connect(replicaUri)
}

export default createConnection
