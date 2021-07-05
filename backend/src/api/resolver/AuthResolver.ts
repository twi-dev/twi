import {Resolver, Mutation, Arg, Ctx, Authorized, ID} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {Service} from "typedi"
import {Context} from "koa"

import {UserRepo} from "repo/UserRepo"
import {User} from "entity/User"

import LogInInput from "api/input/auth/LogIn"
import SignUpInput from "api/input/auth/SignUp"

import Viewer from "api/type/user/Viewer"

@Service()
@Resolver()
class AuthResolver {
  @InjectRepository()
  private _userRepo!: UserRepo

  @Mutation(() => Viewer)
  async authSignUp(
    @Ctx()
    ctx: Context,

    @Arg("user", () => SignUpInput)
    user: LogInInput
  ): Promise<User> {
    const created = await this._userRepo.save(user)

    ctx.session.userId = created.id

    return created
  }

  @Mutation(() => Viewer)
  async authLogIn(
    @Ctx()
    ctx: Context,

    @Arg("credentials", () => LogInInput)
    {username, password}: LogInInput
  ): Promise<User> {
    const user = await this._userRepo.findByEmailOrLogin(username)

    if (!user || !(await this._userRepo.comparePassword(user, password))) {
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
