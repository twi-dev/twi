import bind from "core/graphql/bindResolver"

import Session from "db/model/Session"

const refreshAccessToken = ({args}) => Session.refresh({
  token: args.refreshToken
})

export default bind(refreshAccessToken)
