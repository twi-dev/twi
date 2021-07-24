import {MikroORM, wrap} from "@mikro-orm/core"
import {Service, Inject} from "typedi"
import {
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
  Args,
  Arg,
  ID,
  Authorized,
  Ctx,
  Int
} from "type-graphql"
import {ParameterizedContext} from "koa"

import {StateWithViewer} from "app/state/WithViewer"
import {BaseContext} from "app/context/BaseContext"

import {ChapterPage, ChapterPageParams} from "api/type/chapter/ChapterPage"

import {Chapter, ChapterFilters} from "entity/Chapter"
import {Story, StoryFilters} from "entity/Story"

import ChapterPageArgs from "api/args/ChapterPageArgs"

import StoryChapterAddInput from "api/input/story/ChapterAdd"
import UpdateInput from "api/input/chapter/Update"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

type Context = ParameterizedContext<StateWithViewer, BaseContext>

@Service()
@Resolver(() => Chapter)
class ChapterResolver {
  @Inject()
  private _orm!: MikroORM

  @Query(() => Chapter, {
    description: "Returns chapter by story ID and chapter number"
  })
  @UseMiddleware(NotFound)
  chapter(
    @Arg("storyId", () => ID)
    storyId: number,

    @Arg("number", () => Int)
    number: number
  ): Promise<Chapter | null> {
    const chapterRepo = this._orm.em.getRepository(Chapter)

    return chapterRepo.findOne(
      {number, story: {id: storyId}},

      {filters: [ChapterFilters.PUBLISHED]}
    )
  }

  @Query(() => ChapterPage, {
    description: "Returns list of the chapters by story ID."
  })
  async chapters(
    @Args()
    {storyId, limit, offset, page}: ChapterPageArgs
  ): Promise<ChapterPageParams> {
    const chapterRepo = this._orm.em.getRepository(Chapter)

    const [rows, count] = await chapterRepo.findAndCount(
      {
        story: {id: storyId}
      },
      {
        limit,
        offset,
        filters: [StoryFilters.PUBLISHED]
      }
    )

    return {rows, count, limit, offset, page}
  }

  @Mutation(() => Chapter, {description: "Creates a new chapter."})
  @Authorized()
  @UseMiddleware(GetViewer)
  async storyChapterAdd(
    @Arg("story")
    {id, chapter: fields}: StoryChapterAddInput,

    @Ctx()
    ctx: Context
  ): Promise<Chapter> {
    const chapterRepo = this._orm.em.getRepository(Chapter)
    const storyRepo = this._orm.em.getRepository(Story)

    const story = await storyRepo.findOne({id})

    if (!story) {
      ctx.throw(400)
    }

    const chapter = new Chapter()

    wrap(chapter).assign(fields, {em: this._orm.em})

    story.chaptersCount++

    chapter.story = story
    chapter.number = story.chaptersCount

    await chapterRepo.persistAndFlush(chapter)

    return chapter
  }

  @Mutation(() => Chapter, {description: "Update chapter with given ID."})
  @Authorized()
  @UseMiddleware(GetViewer)
  async storyChapterUpdate(
    @Arg("chapter")
    {id, ...fields}: UpdateInput,

    @Ctx()
    ctx: Context
  ): Promise<Chapter> {
    const chapterRepo = this._orm.em.getRepository(Chapter)

    const chapter = await chapterRepo.findOne({id})

    if (!chapter) {
      ctx.throw(400)
    }

    wrap(chapter).assign(fields)

    await chapterRepo.persistAndFlush(chapter)

    return chapter
  }

  @Mutation(() => ID, {description: "Remove chapter with given ID."})
  @Authorized()
  @UseMiddleware(GetViewer)
  async storyChapterRemove(
    @Arg("chapterId", () => ID)
    chapterId: number,

    @Ctx()
    ctx: Context
  ): Promise<number> {
    const chapterRepo = this._orm.em.getRepository(Chapter)

    const chapter = await chapterRepo.findOne(
      {
        id: chapterId
      },

      {
        populate: ["story"]
      }
    )

    if (!chapter) {
      ctx.throw(400)
    }

    chapter.story.chaptersCount--

    await chapterRepo.softRemoveAndFlush(chapter)

    return chapterId
  }

  @Mutation(() => Chapter, {
    description: "Restores previously soft removed chapter."
  })
  @Authorized()
  async storyChapterRestore(
    @Arg("chapterId", () => ID)
    chapterId: number,

    @Ctx()
    ctx: Context
  ): Promise<Chapter> {
    const chapterRepo = this._orm.em.getRepository(Chapter)

    const chapter = await chapterRepo.findOne(
      {
        id: chapterId
      },

      {
        populate: ["story"],
        filters: {
          softRemoved: false
        }
      }
    )

    if (!chapter) {
      ctx.throw(400)
    }

    chapter.story.chaptersCount++
    chapter.number = chapter.story.chaptersCount

    await chapterRepo.restoreAndFlush(chapter)

    return chapter
  }
}

export default ChapterResolver
