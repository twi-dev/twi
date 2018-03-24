import bind from "core/graphql/bindResolver"

import Session from "database/model/Session"

const refreshAccessToken = params => Session.refresh(params)

export default bind(refreshAccessToken)
