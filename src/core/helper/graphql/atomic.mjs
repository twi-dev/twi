import createOperation from "core/helper/db/atomic"

/**
 * Applies atomic operation helper to given resolver
 */
const atomic = fn => params => createOperation(session => fn({
  ...params, session
}))

export default atomic
