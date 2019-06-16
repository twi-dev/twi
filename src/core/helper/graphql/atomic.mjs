import atomicOperation from "core/helper/db/atomic"

/**
 * Applies atomic operation helper to given resolver
 */
const atomic = resolver => (...params) => atomicOperation(session => {
  if (params.length === 1) {
    // The session will be set to its own property
    // to make it unique for each resolver
    params[0].session = session
  } else {
    // Just a fallback for plain resolvers.
    // BUT I HIGHLY RECOMMEND TO DECORATE RESOLVERS WITH THE bindResolver FIRST
    params.push(session)
  }

  return resolver(params)
})

export default atomic
