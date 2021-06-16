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
import {InjectRepository} from "typeorm-typedi-extensions"
import {ParameterizedContext} from "koa"
import {BodyFile} from "then-busboy"
import {set} from "lodash"

import sharp from "sharp"

import {writeFile, removeFile} from "helper/util/file"

import {File} from "entity/File";
import {User} from "entity/User"
import {UserRepo} from "repo/User"
import {FileRepo} from "repo/File"

import {UserPage, UserPageParams} from "api/type/user/UserPage"

import PageArgs from "api/args/PageArgs"
import Viewer from "api/type/user/Viewer"
import FileInput from "api/input/common/FileInput"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

type Context = ParameterizedContext<{viewer: User}>

@Resolver()
class UserResolver {
  @InjectRepository()
  private _userRepo!: UserRepo

  @InjectRepository()
  private _fileRepo!: FileRepo

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

  @Mutation(() => File)
  @Authorized()
  @UseMiddleware(GetViewer)
  async userAvatarUpdate(
    @Ctx()
    ctx: Context,

    @Arg("image", () => FileInput)
    image: BodyFile
  ): Promise<File> {
    const {viewer} = ctx.state
    const {name, type: mime} = image

    const {path, hash, size} = await writeFile(
      `user/${viewer.id}/avatar/${image.name}`,

      // TODO: I should probably measure image resolution first
      Readable.from(image.stream()).pipe(sharp().resize(180).png())
    )

    // Update existent avatar
    if (viewer.avatar) {
      const {avatar} = viewer
      const {path: oldPath} = avatar

      Object
        .entries(({path, hash, mime, name}))
        .forEach(([name, value]) => set(avatar, name, value))

      const updated =  this._fileRepo.save(viewer.avatar)

      await removeFile(oldPath)

      return updated
    }

    const avatar = await this._fileRepo.createAndSave({
      hash, path, mime, name, size
    })

    viewer.avatar = avatar

    await this._userRepo.save(viewer)

    return avatar
  }

  @Mutation(() => ID, {nullable: true})
  @Authorized()
  @UseMiddleware(GetViewer)
  async userAvatarRemove(@Ctx() ctx: Context): Promise<number | undefined> {
    const {viewer} = ctx.state

    if (!viewer.avatar) {
      return undefined
    }

    const {id, path} = viewer.avatar

    await this._fileRepo.remove(viewer.avatar)
    await removeFile(path)

    return id
  }
}

export default UserResolver
