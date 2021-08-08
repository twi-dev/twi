import {Readable} from "stream"
import {join} from "path"

import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Ctx,
  Args,
  Arg,
  ID,
  UseMiddleware
} from "type-graphql"
import {MikroORM, wrap} from "@mikro-orm/core"
import {ParameterizedContext} from "koa"
import {Service, Inject} from "typedi"
import {BodyFile} from "then-busboy"

import sharp from "sharp"

import {FileStorage} from "helper/file/FileStorage"

import {File} from "entity/File"
import {User} from "entity/User"

import {BaseContext} from "app/context/BaseContext"
import {StateWithViewer} from "app/state/WithViewer"

import {UserPage, UserPageParams} from "api/type/user/UserPage"

import PageArgs from "api/args/PageArgs"
import Viewer from "api/type/user/Viewer"
import FileInput from "api/input/common/FileInput"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

type Context = ParameterizedContext<StateWithViewer, BaseContext>

@Service()
@Resolver(() => User)
class UserResolver {
  @Inject()
  private _orm!: MikroORM

  @Inject()
  private _fs!: FileStorage

  @Query(() => UserPage)
  async users(
    @Args()
    {limit, offset, page}: PageArgs
  ): Promise<UserPageParams> {
    const userRepo = this._orm.em.getRepository(User)

    const [rows, count] = await userRepo.findAndCount({}, {offset, limit})

    return {rows, count, page, limit, offset}
  }

  @Query(() => User, {description: "Returns a user by their email or login"})
  @UseMiddleware(NotFound)
  async user(
    @Arg("username")
    username: string
  ): Promise<User | null> {
    const userRepo = this._orm.em.getRepository(User)

    return userRepo.findOneByEmailOrLogin(username)
  }

  @Query(() => Viewer, {description: "Returns currently logged-in user."})
  @Authorized()
  async viewer(@Ctx() ctx: Context): Promise<User> {
    const userRepo = this._orm.em.getRepository(User)

    const viewer = await userRepo.findOne(ctx.session!.userId)

    if (!viewer) {
      return ctx.throw(401)
    }

    return viewer
  }

  @Mutation(() => File, {description: "Updates avatar of the logged-in user."})
  @Authorized()
  @UseMiddleware(GetViewer)
  async userAvatarUpdate(
    @Arg("image", () => FileInput)
    image: BodyFile,

    @Ctx()
    ctx: Context
  ): Promise<File> {
    const {viewer} = ctx.state
    const {name, type: mime} = image

    const fileRepo = this._orm.em.getRepository(File)
    const userRepo = this._orm.em.getRepository(User)

    const {key, hash} = await this._fs.write(
      join("user", String(viewer.id), "avatar", name),

      // TODO: I should probably measure image resolution first
      Readable.from(image.stream()).pipe(sharp().resize(180).png())
    )

    // Update existent avatar
    if (viewer.avatar) {
      const {avatar} = viewer
      const {key: oldPath} = avatar

      const updated = wrap(avatar).assign({key, hash, mime, name} as File)

      await fileRepo.persistAndFlush(avatar)
      await this._fs.unlink(oldPath)

      return updated
    }

    const avatar = new File({key, hash, mime, name})

    // TODO: Review this for MikroORM compatibility
    viewer.avatar = avatar

    await userRepo.persistAndFlush(viewer)

    return avatar
  }

  @Mutation(() => ID, {
    nullable: true,
    description: "Removes avatar of the logged-in user"
  })
  @Authorized()
  @UseMiddleware(GetViewer)
  async userAvatarRemove(@Ctx() ctx: Context): Promise<number | undefined> {
    const {viewer} = ctx.state

    const fileRepo = this._orm.em.getRepository(File)

    // Do nothing if user has no avatar
    if (!viewer.avatar) {
      return undefined
    }

    const {id, key} = viewer.avatar

    await fileRepo.removeAndFlush(viewer.avatar)
    await this._fs.unlink(key)

    return id
  }
}

export default UserResolver
