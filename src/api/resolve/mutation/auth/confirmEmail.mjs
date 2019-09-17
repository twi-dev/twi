import bind from "core/helper/graphql/normalizeParams"
import waterfall from "core/helper/array/runWaterfall"
import BadRequest from "core/error/http/BadRequest"
import conn from "core/db/connection"

import {get, remove} from "core/auth/tokens"

import User from "model/User"
import Session from "model/Session"

const confirmEmail = ({args, ctx}) => conn.transaction(async transaction => {
  const {client} = ctx.state

  const email = await get(args.hash)

  if (!email) {
    throw new BadRequest("Can't active a user: Bad token signature.")
  }

  let user = await User.findOne({where: {email}}, {transaction})

  if (!user) {
    throw new BadRequest("There's no user with such email.")
  }

  user = await waterfall([
    () => remove(args.hash),

    () => Session.destroy({where: {userId: user.id}}, {transaction}),

    () => user.update({status: User.statuses.active}, {transaction}),

    () => user.reload({attributes: {exclude: ["password"]}}, {transaction})
  ])

  const tokens = await Session.sign({
    client, user: user.toJSON()
  }, {transaction})

  return user.update({lastVisited: new Date()}, {transaction})
    .then(() => tokens)
})

export default confirmEmail |> bind
