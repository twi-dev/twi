import serial from "core/helper/array/runSerial"
import bind from "core/helper/graphql/normalizeParams"
import BadRequest from "core/error/http/BadRequest"

import {get, remove} from "core/auth/tokens"

import User from "model/User"
import Session from "model/Session"

async function confirmEmail({args, ctx}) {
  const {client} = ctx.state

  const email = await get(args.hash)

  // Return false if token is expired
  if (!email) {
    throw new BadRequest("Can't active a user: Bad token signature.")
  }

  let user = await User.findOne({where: email})

  user = await serial([
    () => remove(args.hash),

    () => Session.destroy({where: {userId: user.id}}),

    () => user.update({status: User.statuses.active}),

    () => user.reload({attributes: {exclude: ["password"]}})
  ])

  const tokens = Session.sign({user: user.toJSON(), client})

  return user.update({lastVisited: new Date()}).then(() => tokens)
}

export default confirmEmail |> bind
