import Session from "database/model/Session"

const authenticate = (_, {credentials}, ctx) => (
  Session.sign(credentials, ctx)
)

export default authenticate
