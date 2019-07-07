import bind from "core/graphql/bindResolver"

import Token from "db/model/EmailConfirmationToken"
import User from "db/model/User"

async function confirmEmail({args}) {
  const token = await Token.findOne({hash: args.hash})

  if (!token) {
    return false
  }

  const user = await User.findById(token.userId)

  if (!user) {
    return false
  }


  await Promise.all([
    user.updateOne({$set: {status: User.statuses.activated}}), token.remove()
  ])

  return true
}

export default bind(confirmEmail)
