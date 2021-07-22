import {MikroORM} from "@mikro-orm/core"
import {Service, Inject} from "typedi"
import {
  Resolver,
  // Query,
  // Mutation,
  // UseMiddleware,
  // Args,
  // Arg,
  // ID,
  // Authorized,
  // Ctx,
  // Int
} from "type-graphql"
// import {ParameterizedContext} from "koa"
// import {set} from "lodash"

// import {StateWithViewer} from "app/state/WithViewer"
// import {BaseContext} from "app/context/BaseContext"

// import {ChapterPage, ChapterPageParams} from "api/type/chapter/ChapterPage"

// import {Chapter} from "entity/Chapter"

// import ChapterPageArgs from "api/args/ChapterPageArgs"

// import StoryChapterAddInput from "api/input/story/ChapterAdd"
// import UpdateInput from "api/input/chapter/Update"

// import NotFound from "api/middleware/NotFound"
// import GetViewer from "api/middleware/GetViewer"

// type Context = ParameterizedContext<StateWithViewer, BaseContext>

@Service()
@Resolver()
class ChapterResolver {
  @Inject()
  private _orm!: MikroORM

  // @Query(() => Chapter, {
  //   description: "Returns chapter by story ID and chapter number"
  // })
  // @UseMiddleware(NotFound)
  // chapter(
  //   @Arg("storyId", () => ID)
  //   storyId: number,

  //   @Arg("number", () => Int)
  //   number: number,
  // ): Promise<Chapter | null> {
  //   const chapterRepo = this._orm.em.getRepository(Chapter)

  //   return chapterRepo.findOne({isDraft: false, storyId, number})
  // }

  // @Query(() => ChapterPage, {
  //   description: "Returns list of the chapters by story ID."
  // })
  // async chapters(
  //   @Args()
  //   {storyId, limit, offset, page}: ChapterPageArgs
  // ): Promise<ChapterPageParams> {
  //   const chapterRepo = this._orm.em.getRepository(Chapter)

  //   const [rows, count] = await chapterRepo.findAndCount({
  //     storyId,
  //     isDraft: false
  //   })

  //   return {rows, count, limit, offset, page}
  // }

  // @Mutation(() => Chapter, {description: "Creates a new chapter."})
  // @Authorized()
  // @UseMiddleware(GetViewer)
  // async storyChapterAdd(
  //   @Arg("story")
  //   {id, chapter: fields}: StoryChapterAddInput,

  //   @Ctx()
  //   ctx: Context
  // ): Promise<Chapter> {
  //   let story = await storyRepo.findOne(id)

  //   if (!story) {
  //     ctx.throw(400)
  //   }

  //   await storyRepo.increment({id: story.id}, "chaptersCount", 1)

  //   story = await storyRepo.findOne(story.id)

  //   return chapterRepo.createAndSave({...fields, story})
  // }

  // @Mutation(() => Chapter, {description: "Update chapter with given ID."})
  // @Authorized()
  // @UseMiddleware(GetViewer)
  // async storyChapterUpdate(
  //   @Arg("chapter")
  //   {id, ...fields}: UpdateInput,

  //   @Ctx()
  //   ctx: Context
  // ): Promise<Chapter> {
  //   const chapter = await chapterRepo.findOne(id, {relations: ["story"]})

  //   if (!chapter) {
  //     ctx.throw(400)
  //   }

  //   Object.entries(fields).forEach(([key, value]) => set(chapter, key, value))

  //   return chapterRepo.save(chapter)
  // }

  // @Mutation(() => ID, {description: "Remove chapter with given ID."})
  // @Authorized()
  // @UseMiddleware(GetViewer)
  // async storyChapterRemove(
  //   @Arg("chapterId", () => ID)
  //   chapterId: number,

  //   @Ctx()
  //   ctx: Context
  // ): Promise<number> {
  //   const chapter = await chapterRepo.findOne(chapterId, {relations: ["story"]})

  //   if (!chapter) {
  //     ctx.throw(400)
  //   }

  //   await storyRepo.decrement({id: chapter.story.id}, "chaptersCount", 1)
  //   await chapterRepo.softRemove(chapter)

  //   return chapterId
  // }
}

export default ChapterResolver
