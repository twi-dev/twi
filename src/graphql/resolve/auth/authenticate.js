import Session from "database/model/Session"

const authenticate = (_, {credentials}, ctx) => (
  Session.createOne(credentials, ctx)
)

export default authenticate
