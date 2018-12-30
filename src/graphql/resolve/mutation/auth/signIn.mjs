import bind from "core/graphql/bindResolver"

import Session from "database/model/Session"

const authSignIn = params => Session.sign(params)

export default bind(authSignIn)
