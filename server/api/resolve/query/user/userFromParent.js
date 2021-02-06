import bind from "server/lib/helper/graphql/normalizeParams"

const getUserFromParent = parent => parent.getUser()

export default getUserFromParent |> bind
