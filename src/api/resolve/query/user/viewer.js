import bind from "lib/helper/graphql/normalizeParams"
import auth from "lib/auth/checkUser"

import Contacts from "model/Contacts"
import User from "model/User"

const include = [{model: Contacts, as: "contacts"}]

const getViewer = ({ctx}) => User.findByPk(ctx.state.user.id, {include})

export default getViewer |> auth |> bind
