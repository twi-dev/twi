import {MiddlewareInterface, ResolverData, NextFn} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {Context} from "koa"

import {UserRepo} from "repo/User"

/**
 * Finds current user and adds onto request context
 */
class GetViewer implements MiddlewareInterface<Context> {
  @InjectRepository()
  private _userRepo!: UserRepo

  async use({context}: ResolverData<Context>, next: NextFn) {
    // Require user to be authorized first, just in case
    if (!context.session?.userId) {
      return context.throw(401)
    }

    const viewer = await this._userRepo.findOne(context.session.userId)

    // If there's no user, threat request as unauthorized
    if (!viewer) {
      return context.throw(401, "Cant find current user.")
    }

    // Add user onto context state
    context.state.viewer = viewer

    return next()
  }
}

export default GetViewer
