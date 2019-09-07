import bind from "core/helper/graphql/normalizeParams"

const getUserFromParent = parent => parent.getUser()

export default getUserFromParent |> bind
