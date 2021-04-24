import {InjectRepository} from "typeorm-typedi-extensions"
import {
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
  Args,
  Arg,
  ID,
  Authorized,
  Ctx
} from "type-graphql"
import {Context} from "koa"
import {set} from "lodash"

import {ChapterPage, ChapterPageParams} from "api/type/chapter/ChapterPage"
import {ChapterRepo} from "repo/Chapter"
import {StoryRepo} from "repo/Story"

// import {User} from "entity/User"
import {Chapter} from "entity/Chapter"

import ChapterPageArgs from "api/args/ChapterPageArgs"

import StoryChapterAddInput from "api/input/story/ChapterAdd"
import UpdateInput from "api/input/chapter/Update"

import NotFound from "api/middleware/NotFound"
import GetViewer from "api/middleware/GetViewer"

@Resolver()
class ChapterResolver {
  @InjectRepository()
  private _chapterRepo!: ChapterRepo

  @InjectRepository()
  private _storyRepo!: StoryRepo

  @Query(() => Chapter)
  @UseMiddleware(NotFound)
  chapter(
    @Arg("id", () => ID)
    id: number,

    @Arg("storyId", () => ID)
    storyId: string
  ): Promise<Chapter | undefined> {
    return this._chapterRepo.findOne({where: {isDraft: false, storyId, id}})
  }

  @Query(() => ChapterPage)
  async chapters(
    @Args() {storyId, limit, offset, page}: ChapterPageArgs
  ): Promise<ChapterPageParams> {
    const [rows, count] = await this._chapterRepo.findAndCount({
      where: {
        storyId,
        isDraft: false
      }
    })

    return {rows, count, limit, offset, page}
  }

  @Mutation(() => Chapter)
  @Authorized()
  @UseMiddleware(GetViewer)
  async chapterAdd(
    @Ctx()
    ctx: Context,

    @Arg("story")
    {id, chapter}: StoryChapterAddInput
  ): Promise<Chapter> {
    const story = await this._storyRepo.findOne(id)

    if (!story) {
      ctx.throw(400)
    }

    return this._chapterRepo.createAndSave(story.id, chapter)
  }

  @Mutation(() => Chapter)
  @Authorized()
  @UseMiddleware(GetViewer)
  async chapterUpdate(
    @Ctx()
    ctx: Context,

    @Arg("chapter")
    {id, ...fields}: UpdateInput
  ): Promise<Chapter> {
    const chapter = await this._chapterRepo.findOne(id)

    if (!chapter) {
      ctx.throw(401)
    }

    Object.entries(fields).forEach(([key, value]) => set(chapter, key, value))

    return this._chapterRepo.save(chapter)
  }

  @Mutation(() => ID)
  @Authorized()
  @UseMiddleware(GetViewer)
  async chapterRemove(
    @Ctx()
    ctx: Context,

    @Arg("chapterId", () => ID)
    chapterId: number
  ): Promise<number> {
    const chapter = await this._chapterRepo.findOne(chapterId)

    if (!chapter) {
      ctx.throw(400)
    }

    return this._chapterRepo.softRemove(chapter).then(() => chapterId)
  }
}

export default ChapterResolver
