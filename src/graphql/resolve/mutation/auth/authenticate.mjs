import bind from "core/graphql/bindResolver"

import Session from "database/model/Session"

const authenticate = params => Session.sign(params)

export default bind(authenticate)
