import bind from "core/helper/graphql/normalizeParams"

const userFromParent = parent => parent.getUser()

export default bind(userFromParent)
