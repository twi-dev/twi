import {Resolver, Mutation, Arg, Ctx, Authorized, ID} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {Context} from "koa"

import UserRepo from "repo/User"

import {User} from "entity/User"

import LogInInput from "api/input/auth/LogIn"
import SignUpInput from "api/input/auth/SignUp"

@Resolver()
class AuthResolver {
  @InjectRepository()
  private _userRepo: UserRepo

  async authSignUp(
    @Ctx()
    ctx: Context,

    @Arg("user", () => SignUpInput)
    user: LogInInput
  ): Promise<User> {
    const created = await this._userRepo.createAndSave(user)

    ctx.session.userId = created.id

    return created
  }

  async authLogIn(
    @Ctx()
    ctx: Context,

    @Arg("credentials", () => LogInInput)
    {username, password}: LogInInput
  ): Promise<User> {
    const user = await this._userRepo.findOne({
      where: [{login: username}, {email: username}]
    })

    if (!user || !(await user.comparePassword(password))) {
      ctx.throw(401)
    }

    ctx.session.userId = user.id

    return user
  }

  @Mutation(() => ID)
  @Authorized()
  authLogOut(@Ctx() ctx: Context): number {
    const userId: number = ctx.session.userId

    ctx.session = null

    return userId
  }
}

export default AuthResolver
