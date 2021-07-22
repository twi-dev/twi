import {MiddlewareInterface, ResolverData, NextFn} from "type-graphql"
import {MikroORM} from "@mikro-orm/core"
import {ParameterizedContext} from "koa"
import {Service, Inject} from "typedi"

import {StateWithViewer} from "app/state/WithViewer"
import {BaseContext} from "app/context/BaseContext"

import {User} from "entity/User"

type Context = ParameterizedContext<StateWithViewer, BaseContext>

/**
 * Finds current user and adds onto request context
 */
@Service()
class GetViewer implements MiddlewareInterface<Context> {
  @Inject()
  private _orm!: MikroORM

  async use({context}: ResolverData<Context>, next: NextFn) {
    // Require user to be authorized first, just in case
    if (!context.session?.userId) {
      return context.throw(401)
    }

    const userRepo = this._orm.em.getRepository(User)

    const viewer = await userRepo.findOne(context.session.userId)

    // If there's no user, threat request as unauthorized
    // c8 ignore next 3
    if (!viewer) {
      return context.throw(401, "Cant find current user.")
    }

    // Add user onto context state
    context.state.viewer = viewer

    return next()
  }
}

export default GetViewer
