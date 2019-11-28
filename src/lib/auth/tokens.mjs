import {createHash} from "crypto"

import ms from "ms"

import concat from "lib/helper/string/concatFromArray"

import store from "./tokensStore"

const prefix = ":token"
const sep = ":"
const expire = ms("1d")

// The "PX" argument tells redis to treat expiration time in milliseconds
function add({email, id}) {
  const payload = JSON.stringify({email, userId: id, now: Date.now()})
  const hash = createHash("sha512").update(payload).digest("hex")

  return store.set(concat([prefix, hash], sep), email, "PX", expire)
    .then(() => hash)
}

const get = hash => store.get(concat([prefix, hash], sep))

const remove = hash => store.del(concat([prefix, hash], sep))

export {add, get, remove}
