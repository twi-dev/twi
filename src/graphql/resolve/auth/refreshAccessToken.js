import Session from "database/model/Session"

const refreshAccessToken = (_, {refreshToken}, ctx) => (
  Session.refresh(refreshToken, ctx)
)

export default refreshAccessToken
