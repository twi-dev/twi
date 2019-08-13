import create from "core/helper/db/atomic"

/**
 * Applies atomic operation helper to given resolver
 */
const atomic = fn => params => create(session => fn({...params, session}))

export default atomic
