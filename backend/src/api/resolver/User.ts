import {Resolver, Query, Authorized, Ctx} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {Context} from "koa"

import User from "entity/User"
import UserRepo from "repo/User"

import Viewer from "api/type/user/Viewer"

@Resolver()
class UserResolver {
  @InjectRepository()
  private _userRepo: UserRepo

  @Query(() => Viewer)
  @Authorized()
  viewer(@Ctx() ctx: Context): Promise<User> {
    return this._userRepo.findOne(ctx.session.userId)
  }
}

export default UserResolver
