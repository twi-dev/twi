const reserved = [
  "admin", "superuser", "super", "su", "owner", "dev", "developer",
  "mod", "moderator", "support", "supporttech", "tech"
].map(word => new RegExp(`^${word}$`, "i"))

/**
 * Check if given login is reserved for internal usage.
 *
 * @param {string}
 *
 * @return {boolean}
 */
const isReserved = login => reserved.some(word => word.test(login))

export default isReserved
