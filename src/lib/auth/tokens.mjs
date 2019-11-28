import {createHash} from "crypto"

import Redis from "ioredis"
import ms from "ms"

import concat from "lib/helper/string/concatFromArray"

const store = new Redis()

const sep = ":"
const prefix = `${sep}token`
const expire = ms("1d")

/**
 * Adds a new confirmation token to the store
 *
 * @param {User} user
 *
 * @return {string}
 */
function add({email, id}) {
  const payload = JSON.stringify({email, userId: id, now: Date.now()})
  const hash = createHash("sha512").update(payload).digest("hex")

  // The "PX" argument tells redis to treat expiration time in milliseconds
  return store.set(concat([prefix, hash], sep), id, "PX", expire)
    .then(() => hash)
}

/**
 * Returns user's identifier assigned with given token
 *
 * @param {string} hash
 *
 * @return {number}
 */
const get = hash => store.get(concat([prefix, hash], sep))

/**
 * Removes a token from the store by associated hash
 *
 * @param {string} hash
 */
const remove = hash => store.del(concat([prefix, hash], sep))

export {add, get, remove}
