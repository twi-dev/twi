import bind from "core/graphql/bindResolver"

import User from "db/model/User"
import Token from "db/model/EmailConfirmationToken"

async function confirmEmail({args}) {
  const token = await Token.findOne({hash: args.hash})

  if (!token) {
    return false
  }

  const user = await User.findById(token.userId)

  if (!user) {
    return false
  }

  await user.updateOne({$set: {status: User.statuses.activated}})
  await token.remove()

  return true
}

export default bind(confirmEmail)
