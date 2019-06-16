import mongoose from "mongoose"

/**
 * Helps to run a transactional operation.
 * This helper applies a single operation function and calls it with
 * the unique session MongoDB.
 */
async function atomic(operation) {
  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    return operation(session)
  } catch (err) {
    session.abortTransaction()

    throw err
  } finally {
    session.endTransaction()
  }
}

export default atomic
