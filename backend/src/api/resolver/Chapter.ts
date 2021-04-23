import {InjectRepository} from "typeorm-typedi-extensions"
import {
  Resolver,
  Query,
  UseMiddleware,
  Args,
  Arg,
  ID
} from "type-graphql"

import {ChapterPage, ChapterPageParams} from "api/type/chapter/ChapterPage"
import {ChapterRepo} from "repo/Chapter"
import {Chapter} from "entity/Chapter"

import ChapterPageArgs from "api/args/ChapterPageArgs"

import NotFound from "api/middleware/NotFound"

@Resolver()
class ChapterResolver {
  @InjectRepository()
  private _chapterRepo!: ChapterRepo

  @Query(() => Chapter)
  @UseMiddleware(NotFound)
  chapter(
    @Arg("id", () => ID)
    id: number,

    @Arg("storyId", () => ID)
    storyId: string
  ): Promise<Chapter> {
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
}

export default ChapterResolver
