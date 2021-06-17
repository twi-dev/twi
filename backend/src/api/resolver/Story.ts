import {join} from "path"

import {InjectRepository} from "typeorm-typedi-extensions"
import {
  FieldResolver,
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  Args,
  Root,
  Authorized,
  UseMiddleware,
  ID
} from "type-graphql"
import {ParameterizedContext} from "koa"
import {set} from "lodash"

import {StoryRepo} from "repo/Story"
import {UserRepo} from "repo/User"
import {FileRepo} from "repo/File"

import {Story} from "entity/Story"
import {User} from "entity/User"
import {File} from "entity/File"

import {writeFile, removeFile, WriteFileResult} from "helper/util/file"

import {StoryPage, StoryPageParams} from "api/type/story/StoryPage"

import PageArgs from "api/args/PageArgs"
import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"
import FileNodeInput from "api/input/common/FileNode"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

type Context = ParameterizedContext<{viewer: User}>

@Resolver(() => Story)
class StoryResolver {
  @InjectRepository()
  private _storyRepo!: StoryRepo

  @InjectRepository()
  private _userRepo!: UserRepo

  @InjectRepository()
  private _fileRepo!: FileRepo

  @FieldResolver(() => User)
  async publisher(
    @Root() {publisher, publisherId}: Story
  ): Promise<User | undefined> {
    if (!publisher) {
      return this._userRepo.findOne(publisherId)
    }

    return publisher
  }

  @Query(() => StoryPage)
  async stories(
    @Args() {limit, page, offset}: PageArgs
  ): Promise<StoryPageParams> {
    const [rows, count] = await this._storyRepo.findAndCount({
      skip: offset, take: limit, where: {isDraft: false}
    })

    return {rows, count, page, limit, offset}
  }

  @Query(() => Story, {description: "Finds a story by given id or slug"})
  @UseMiddleware(NotFound)
  async story(@Arg("idOrSlug") idOrSlug: string): Promise<Story | undefined> {
    return this._storyRepo.findByIdOrSlug(idOrSlug)
  }

  @Mutation(() => Story, {description: "Creates a new story"})
  @Authorized()
  async storyAdd(
    @Ctx() ctx: Context,
    @Arg("story", () => StoryAddInput) story: Story
  ): Promise<Story> {
    const {userId} = ctx.session

    return this._storyRepo.createAndSave(userId, story)
  }

  @Mutation(() => Story)
  @Authorized()
  async storyUpdate(
    @Ctx()
    ctx: Context,

    @Arg("story")
    {id, ...fields}: StoryUpdateInput
  ): Promise<Story> {
    const story = await this._storyRepo.findOne(id)

    if (!story) {
      ctx.throw(400)
    }

    Object.entries(fields).forEach(([key, value]) => set(story, key, value))

    return this._storyRepo.save(story)
  }

  @Mutation(() => ID)
  @Authorized()
  async storyRemove(
      @Ctx()
      ctx: Context,

      @Arg("storyId", () => ID)
      storyId: number
    ): Promise<number> {
    const story = await this._storyRepo.findOne(storyId)

    if (!story) {
      ctx.throw(400)
    }

    return this._storyRepo.softRemove(story).then(() => storyId)
  }

  @Mutation(() => File)
  @Authorized()
  @UseMiddleware([GetViewer, NotFound])
  async storyCoverUpdate(
    @Ctx()
    ctx: Context,

    @Arg("story")
    {id, file}: FileNodeInput
  ): Promise<File | undefined> {
    // TODO: Check for user's permissions
    const {name, type: mime} = file

    const story = await this._storyRepo.findOne(id)

    if (!story) {
      return undefined
    }

    const {path, hash}: WriteFileResult = await writeFile(
      join("story", String(story.id), "cover", name),

      file.stream()
    )

    if (story.cover) {
      const {cover} = story
      const {path: oldPath} = cover

      Object
        .entries(({path, hash, mime, name}))
        .forEach(([key, value]) => set(cover, key, value))

      const updated: File = await this._fileRepo.save(cover)

      await removeFile(oldPath)

      return updated
    }

    const cover: File = await this._fileRepo.createAndSave({
      hash, path, mime, name
    })

    story.cover = cover

    await this._storyRepo.save(story)

    return cover
  }

  @Mutation(() => ID, {nullable: true})
  @Authorized()
  @UseMiddleware([GetViewer, NotFound])
  async storyCoverRemove(
    @Ctx()
    ctx: Context,

    @Arg("storyId", () => ID)
    storyId: number
  ): Promise<number | null | undefined> {
    // TODO: Check user's permissions
    const story = await this._storyRepo.findOne(storyId)

    // Report unexistent story to NotFount middleware
    if (!story) {
      return undefined
    }

    // Do nothing and return `null` if the story has no cover
    if (!story.cover) {
      return null
    }

    const {id, path} = story.cover

    await this._fileRepo.remove(story.cover)
    await removeFile(path)

    return id
  }
}

export default StoryResolver
