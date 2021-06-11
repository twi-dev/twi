import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Args,
  Arg,
  UseMiddleware
} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {ParameterizedContext} from "koa"

import {User} from "entity/User"
import {UserRepo} from "repo/User"

import {UserPage, UserPageParams} from "api/type/user/UserPage"

import PageArgs from "api/args/PageArgs"
import Viewer from "api/type/user/Viewer"

import NotFound from "api/middleware/NotFound"

type Context = ParameterizedContext<{viewer: User}>

@Resolver()
class UserResolver {
  @InjectRepository()
  private _userRepo!: UserRepo

  @Query(() => UserPage)
  async users(@Args() {limit, offset, page}: PageArgs): Promise<UserPageParams> {
    const [rows, count] = await this._userRepo.findAndCount({
      skip: offset, take: limit, where: {isDraft: false}
    })

    return {rows, count, page, limit, offset}
  }

  @Query(() => User, {description: "Finds a user by their email or login"})
  @UseMiddleware(NotFound)
  async user(
    @Arg("emailOrLogin") emailOrLogin: string
  ): Promise<User | undefined> {
    return this._userRepo.findByEmailOrLogin(emailOrLogin)
  }

  @Query(() => Viewer, {description: "Finds currently logged in user"})
  @Authorized()
  @UseMiddleware(NotFound)
  viewer(@Ctx() ctx: Context): Promise<User | undefined> {
    return this._userRepo.findOne(ctx.session.userId)
  }
}

export default UserResolver
