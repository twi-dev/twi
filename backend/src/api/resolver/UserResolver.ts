import {Readable} from "stream"

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
import {Connection, Transaction, TransactionRepository} from "typeorm"
import {InjectConnection} from "typeorm-typedi-extensions"
import {ParameterizedContext} from "koa"
import {BodyFile} from "then-busboy"
import {Service} from "typedi"
import {set} from "lodash"

import sharp from "sharp"

import {writeFile, removeFile, WriteFileResult} from "helper/util/file"

import {File} from "entity/File"
import {User} from "entity/User"
import {UserRepo} from "repo/UserRepo"
import {FileRepo} from "repo/FileRepo"

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
@Resolver()
class UserResolver {
  @InjectConnection()
  private _db!: Connection

  @Query(() => UserPage)
  async users(
    @Args()
    {limit, offset, page}: PageArgs
  ): Promise<UserPageParams> {
    const userRepo = this._db.getCustomRepository(UserRepo)

    const [rows, count] = await userRepo.findAndCount({
      skip: offset, take: limit
    })

    return {rows, count, page, limit, offset}
  }

  @Query(() => User, {description: "Returns a user by their email or login"})
  @UseMiddleware(NotFound)
  async user(
    @Arg("username")
    username: string
  ): Promise<User | undefined> {
    const userRepo = this._db.getCustomRepository(UserRepo)

    return userRepo.findByEmailOrLogin(username)
  }

  @Query(() => Viewer, {description: "Returns currently logged-in user."})
  @Authorized()
  async viewer(@Ctx() ctx: Context): Promise<User | undefined> {
    const userRepo = this._db.getCustomRepository(UserRepo)

    const viewer = await userRepo.findOne(ctx.session!.userId)

    if (!viewer) {
      return ctx.throw(401)
    }

    return viewer
  }

  @Mutation(() => File, {description: "Updates avatar of the logged-in user."})
  @Authorized()
  @UseMiddleware(GetViewer)
  @Transaction()
  async userAvatarUpdate(
    @Arg("image", () => FileInput)
    image: BodyFile,

    @Ctx()
    ctx: Context,

    @TransactionRepository()
    userRepo: UserRepo,

    @TransactionRepository()
    fileRepo: FileRepo
  ): Promise<File> {
    const {viewer} = ctx.state
    const {name, type: mime} = image

    const {path, hash}: WriteFileResult = await writeFile(
      `user/${viewer.id}/avatar/${name}`,

      // TODO: I should probably measure image resolution first
      Readable.from(image.stream()).pipe(sharp().resize(180).png())
    )

    // Update existent avatar
    if (viewer.avatar) {
      const {avatar} = viewer
      const {path: oldPath} = avatar

      Object
        .entries(({path, hash, mime, name}))
        .forEach(([key, value]) => set(avatar, key, value))

      const updated = await fileRepo.save(avatar)

      await removeFile(oldPath)

      return updated
    }

    const avatar = await fileRepo.createAndSave({
      hash, path, mime, name
    })

    viewer.avatar = avatar

    await userRepo.save(viewer)

    return avatar
  }

  @Mutation(() => ID, {
    nullable: true, description: "Removes avatar of the logged-in user"
  })
  @Authorized()
  @UseMiddleware(GetViewer)
  @Transaction()
  async userAvatarRemove(
    @Ctx()
    ctx: Context,

    @TransactionRepository()
    fileRepo: FileRepo
  ): Promise<number | null> {
    const {viewer} = ctx.state

    // Do nothing if user has no avatar
    if (!viewer.avatar) {
      return null
    }

    const {id, path} = viewer.avatar

    await fileRepo.remove(viewer.avatar)
    await removeFile(path)

    return id
  }
}

export default UserResolver
