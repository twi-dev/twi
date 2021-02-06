import bind from "server/lib/helper/graphql/normalizeParams"

import User from "server/model/User"

const getViewer = ({ctx}) => User.findByPk(ctx.state.user.id)

export default getViewer |> bind
