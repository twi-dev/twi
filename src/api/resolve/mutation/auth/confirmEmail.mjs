import bind from "core/helper/graphql/normalizeParams"

import {get, remove} from "core/auth/tokens"

import User from "model/User"

async function confirmEmail({args}) {
  const email = await get(args.hash)

  // Return false if token is expired
  if (!email) {
    return false
  }

  return Promise.all([
    remove(args.hash),
    User.update({status: User.statuses.active}, {where: {email}})
  ]).then(() => true)
}

export default confirmEmail |> bind
