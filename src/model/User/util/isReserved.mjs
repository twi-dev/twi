const reserved = [
  "admin", "superuser", "super", "su", "owner", "dev", "developer",
  "mod", "moderator", "support", "supporttech", "tech"
]

/**
 * Check if given login is reserved for internal usage.
 *
 * @param {string}
 *
 * @return {boolean}
 */
const isReserved = login => reserved.some(word => word === login.toLowerCase())

export default isReserved
