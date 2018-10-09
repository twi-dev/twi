import User from "database/model/User"
import bind from "core/graphql/bindResolver"

const removeAvatar = params => User.removeAvatar(params)

export default removeAvatar |> bind
