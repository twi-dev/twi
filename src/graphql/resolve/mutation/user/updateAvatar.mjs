import User from "database/model/User"
import bind from "core/graphql/bindResolver"

const updateAvatar = params => User.updateAvatar(params)

export default updateAvatar |> bind
