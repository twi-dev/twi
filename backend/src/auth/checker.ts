import {AuthChecker} from "type-graphql"
import {Context} from "koa"

/**
 * Auth checker for type-graphql
 */
const authChecker: AuthChecker<Context> = ({context}) => {
  if (!context.session.userId) {
    return false
  }

  // TODO: Add an extended logic for checking user's basic privileges
  return true
}

export default authChecker
