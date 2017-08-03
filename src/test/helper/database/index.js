import {Mockgoose} from "mockgoose"
import mongoose from "mongoose"
import {v4} from "uuid"

async function createConnection() {
  const mockgoose = new Mockgoose(mongoose)

  mongoose.Promise = Promise

  await mockgoose.prepareStorage()

  return await mongoose.connect(`mongodb://localhost/twi-test-${v4()}`, {
    useMongoClient: true,
    promiseLibrary: Promise
  })
}

export default createConnection
