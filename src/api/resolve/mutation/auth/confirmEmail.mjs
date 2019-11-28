import bind from "lib/helper/graphql/normalizeParams"
import BadRequest from "lib/error/http/BadRequest"
import serial from "lib/helper/array/runSerial"
import conn from "lib/db/connection"

import {get, remove} from "lib/auth/tokens"

import User from "model/User"
import Session from "model/Session"

const confirmEmail = ({args, ctx}) => conn.transaction(async transaction => {
  const {client} = ctx.state

  const id = await get(args.hash)

  if (!id) {
    throw new BadRequest("Can't activate a user: Bad token signature.")
  }

  let user = await User.findByPk(id, {transaction})

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  user = await serial([
    () => remove(args.hash),

    () => Session.destroy({where: {userId: user.id}, transaction}),

    () => user.update({status: User.statuses.active}, {transaction}),

    () => user.reload({transaction})
  ])

  const tokens = await Session.sign({
    client, user: user.toJSON()
  }, {transaction})

  return user.update({lastVisited: new Date()}, {transaction})
    .then(() => tokens)
})

export default confirmEmail |> bind
