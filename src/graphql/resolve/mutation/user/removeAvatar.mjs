import User from "db/model/User"

import bind from "core/graphql/bindResolver"

const removeAvatar = params => User.removeAvatar(params)

export default removeAvatar |> bind
