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
import {set, isEmpty} from "lodash"

import {StoryRepo} from "repo/Story.repo"
import {UserRepo} from "repo/User.repo"
import {FileRepo} from "repo/File.repo"
import {TagRepo} from "repo/Tag.repo"

import {Story} from "entity/Story"
import {User} from "entity/User"
import {File} from "entity/File"
import {Tag} from "entity/Tag"

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

  @InjectRepository()
  private _tagRepo!: TagRepo

  @FieldResolver(() => User)
  async publisher(
    @Root() {publisher, publisherId}: Story
  ): Promise<User | undefined> {
    if (!publisher) {
      return this._userRepo.findOne(publisherId)
    }

    return publisher
  }

  @FieldResolver(() => [Tag], {nullable: "items"})
  tags(
    @Root()
    {tags}: Story
  ) {
    if (isEmpty(tags)) {
      return []
    }

    return tags
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
  @UseMiddleware(GetViewer)
  async storyAdd(
    @Ctx()
    ctx: Context,

    @Arg("story", () => StoryAddInput)
    {tags, ...story}: StoryAddInput
  ): Promise<Story> {
    const {viewer} = ctx.state

    let storyTags: Tag[] | null = null
    if (tags) {
      storyTags = await this._tagRepo.findOrCreateMany(tags)
    }

    return this._storyRepo.createAndSave({
      ...story, tags: storyTags, publisher: viewer
    })
  }

  @Mutation(() => Story)
  @Authorized()
  async storyUpdate(
    @Ctx()
    ctx: Context,

    @Arg("story")
    {id, tags, ...fields}: StoryUpdateInput
  ): Promise<Story> {
    const story = await this._storyRepo.findOne(id)

    if (!story) {
      ctx.throw(400)
    }

    Object.entries(fields).forEach(([key, value]) => set(story, key, value))

    if (tags) {
      story.tags = await this._tagRepo.findOrCreateMany(tags)
    }

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
    @Arg("storyId", () => ID)
    storyId: number
  ): Promise<number | null | undefined> {
    // TODO: Check user's permissions
    const story = await this._storyRepo.findOne(storyId)

    // Report non-existent story to NotFount middleware
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
