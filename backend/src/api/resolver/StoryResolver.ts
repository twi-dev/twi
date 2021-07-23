import {join} from "path"

import {MikroORM, wrap} from "@mikro-orm/core"
import {Service, Inject} from "typedi"
import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  Args,
  Authorized,
  UseMiddleware,
  ID
} from "type-graphql"
import {ParameterizedContext} from "koa"

import {Story, StoryFilters} from "entity/Story"
import {File} from "entity/File"
import {Tag} from "entity/Tag"

import {writeFile, removeFile, WriteFileResult} from "helper/util/file"

import {BaseContext} from "app/context/BaseContext"
import {StateWithViewer} from "app/state/WithViewer"

import {StoryPage, StoryPageParams} from "api/type/story/StoryPage"

import PageArgs from "api/args/PageArgs"
import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"
import FileNodeInput from "api/input/common/FileNode"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

type Context = ParameterizedContext<StateWithViewer, BaseContext>

@Service()
@Resolver(() => Story)
class StoryResolver {
  @Inject()
  private _orm!: MikroORM

  @Query(() => StoryPage)
  async stories(
    @Args()
    {limit, page, offset}: PageArgs
  ): Promise<StoryPageParams> {
    const storyRepo = this._orm.em.getRepository(Story)

    const [rows, count] = await storyRepo.findAndCount(
      {},

      {
        limit,
        offset,
        filters: [StoryFilters.PUBLISHED]
      }
    )

    return {rows, count, page, limit, offset}
  }

  @Query(() => Story, {description: "Finds a story by given id or slug"})
  @UseMiddleware(NotFound)
  async story(
    @Arg("idOrSlug") idOrSlug: string
  ): Promise<Story | null> {
    const storyRepo = this._orm.em.getRepository(Story)

    return storyRepo.findOneByIdOrSlug(idOrSlug, {
      filters: [StoryFilters.PUBLISHED]
    })
  }

  @Mutation(() => Story, {description: "Creates a new story"})
  @Authorized()
  @UseMiddleware(GetViewer)
  async storyAdd(
    @Arg("story", () => StoryAddInput)
    {title, description, tags}: StoryAddInput,

    @Ctx()
    ctx: Context
  ): Promise<Story> {
    const {viewer} = ctx.state

    const storyRepo = this._orm.em.getRepository(Story)
    const tagRepo = this._orm.em.getRepository(Tag)

    const story = new Story(title, description)

    story.publisher = viewer

    if (tags) {
      story.tags.set(await tagRepo.findOrCreate(tags))
    }

    await storyRepo.persistAndFlush(story)

    return story
  }

  @Mutation(() => Story, {description: "Updates story with given ID."})
  @Authorized()
  async storyUpdate(
    @Arg("story")
    {id, tags, ...fields}: StoryUpdateInput,

    @Ctx()
    ctx: Context
  ): Promise<Story> {
    const storyRepo = this._orm.em.getRepository(Story)
    const tagRepo = this._orm.em.getRepository(Tag)

    const story = await storyRepo.findOne(id)

    if (!story) {
      ctx.throw(400)
    }

    wrap(story).assign(fields)

    if (tags) {
      story.tags.set(await tagRepo.findOrCreate(tags))
    } else if (tags === null) { // Remove all tags from the story if "tags" parameter is null
      story.tags.removeAll()
    }

    await storyRepo.persistAndFlush(story)

    return story
  }

  @Mutation(() => ID, {description: "Removed story with given ID."})
  @Authorized()
  async storyRemove(
    @Arg("storyId", () => ID)
    storyId: number,

    @Ctx()
    ctx: Context
  ): Promise<number> {
    const storyRepo = this._orm.em.getRepository(Story)

    const story = await storyRepo.findOne(storyId)

    if (!story) {
      ctx.throw(400)
    }

    // TODO: Add soft removing implementation
    return storyRepo.removeAndFlush(story).then(() => storyId)
  }

  @Mutation(() => File, {description: "Updates story's cover."})
  @Authorized()
  @UseMiddleware([GetViewer, NotFound])
  async storyCoverUpdate(
    @Arg("story") {id, file}: FileNodeInput
  ): Promise<File | undefined> {
    // TODO: Check for user's permissions
    const {name, type: mime} = file

    const storyRepo = this._orm.em.getRepository(Story)
    const fileRepo = this._orm.em.getRepository(File)

    const story = await storyRepo.findOne(id)

    if (!story) {
      return undefined
    }

    const {path, hash}: WriteFileResult = await writeFile(
      join("story", String(story.id), "cover", name),

      file.stream()
    )

    if (story.cover) {
      const {cover} = story
      const {key: oldPath} = cover

      const updated = wrap(cover).assign({key: path, hash, name, mime} as File)

      await fileRepo.persistAndFlush(cover)

      await removeFile(oldPath)

      return updated
    }

    const cover = new File({key: path, name, mime, hash})

    story.cover = cover

    await storyRepo.persistAndFlush(story)

    return cover
  }

  @Mutation(() => ID, {nullable: true, description: "Removes story's cover."})
  @Authorized()
  @UseMiddleware([GetViewer, NotFound])
  async storyCoverRemove(
    @Arg("storyId", () => ID)
    storyId: number
  ): Promise<number | null | undefined> {
    const storyRepo = this._orm.em.getRepository(Story)
    const fileRepo = this._orm.em.getRepository(File)

    // TODO: Check user's permissions
    const story = await storyRepo.findOne(storyId)

    // Report non-existent story to NotFount middleware
    if (!story) {
      return null
    }

    // Do nothing and return `undefined` if the story has no cover
    if (!story.cover) {
      return undefined
    }

    const {id, key: path} = story.cover

    await fileRepo.removeAndFlush(story.cover)
    await removeFile(path)

    return id
  }
}

export default StoryResolver
