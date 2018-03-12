import {createConnection} from "./"

async function clear() {
  const mongoose = await createConnection()

  console.log("Clearing database...")

  await mongoose.connections[0].db.dropDatabase()
}

const onFulfilled = () => process.exit(0)

const onRejected = err => {
  console.error(err)
  process.exit(1)
}

clear().then(onFulfilled, onRejected)
