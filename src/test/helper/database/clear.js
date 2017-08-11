import {createConnection} from "./"

async function clear() {
  const connection = await createConnection()

  console.log("Clearing database...")
  await connection.db.dropDatabase()
}

const onFulfilled = () => process.exit(0)

const onRejected = err => {
  console.error(err)
  process.exit(1)
}

clear().then(onFulfilled, onRejected)
