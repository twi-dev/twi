const reserved = [
  "admin", "superuser", "su", "owner", "dev", "developer",
  "mod", "moderator", "support", "supporttech", "tech"
]

/**
 * Check if given login is reserved for internal usage.
 *
 * @param {string}
 *
 * @return {boolean}
 */
function isReserved(login) {
  for (const word of reserved) {
    if (new RegExp(word, "i").test(login)) {
      return true
    }
  }

  return false
}

export default isReserved
