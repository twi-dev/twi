import {MiddlewareInterface, ResolverData, NextFn} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {ParameterizedContext} from "koa"
import {Service} from "typedi"

import {UserRepo} from "repo/UserRepo"

import {StateWithViewer} from "app/state/WithViewer"
import {BaseContext} from "app/context/BaseContext"

type Context = ParameterizedContext<StateWithViewer, BaseContext>

/**
 * Finds current user and adds onto request context
 */
@Service()
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
