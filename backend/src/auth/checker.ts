import {AuthChecker} from "type-graphql"

import {BaseContext} from "app/context/BaseContext"

/**
 * Auth checker for type-graphql
 */
const authChecker: AuthChecker<BaseContext> = ({context}) => {
  if (!context.session?.userId) {
    return false
  }

  // TODO: Add an extended logic for checking user's basic privileges
  return true
}

export default authChecker
