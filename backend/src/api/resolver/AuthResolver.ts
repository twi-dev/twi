import {Resolver, Mutation, Arg, Ctx, Authorized, ID} from "type-graphql"
import {ParameterizedContext, DefaultState} from "koa"
import {MikroORM} from "@mikro-orm/core"
import {Service, Inject} from "typedi"

import {BaseContext} from "app/context/BaseContext"
import {User} from "entity/User"

import LogInInput from "api/input/auth/LogIn"
import SignUpInput from "api/input/auth/SignUp"

import Viewer from "api/type/user/Viewer"

type Context = ParameterizedContext<DefaultState, BaseContext>

@Service()
@Resolver(() => User)
class AuthResolver {
  @Inject()
  private _orm!: MikroORM

  @Mutation(() => Viewer)
  async authSignUp(
    @Ctx()
    ctx: Context,

    @Arg("user", () => SignUpInput)
    {email, login, password}: SignUpInput
  ): Promise<User> {
    const userRepo = this._orm.em.getRepository(User)

    const user = new User()

    user.login = login
    user.email = email
    user.password = password

    await userRepo.persistAndFlush(user)

    ctx.session!.userId = user.id

    return user
  }

  @Mutation(() => Viewer)
  async authLogIn(
    @Ctx()
    ctx: Context,

    @Arg("credentials", () => LogInInput)
    {username, password}: LogInInput
  ): Promise<User> {
    const userRepo = this._orm.em.getRepository(User)

    const user = await userRepo.findOneByEmailOrLogin(username)

    if (!user || !(await userRepo.comparePassword(user, password))) {
      ctx.throw(401)
    }

    ctx.session!.userId = user.id

    return user
  }

  @Mutation(() => ID)
  @Authorized()
  authLogOut(@Ctx() ctx: Context): number {
    const {userId} = ctx.session!

    ctx.session = null

    return userId
  }
}

export default AuthResolver
