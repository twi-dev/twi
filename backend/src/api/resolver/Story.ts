import {Resolver, Query, Mutation, Ctx, Arg, Args, Authorized, ID} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions"
import {Context} from "koa"

import PageArgs from "api/args/PageArgs"
import StoryRepo from "repo/Story"

import {Story} from "entity/Story"
import {StoryPage, StoryPageParams} from "api/type/story/StoryPage"

@Resolver()
class StoryResolver {
  @InjectRepository()
  private _storyRepo: StoryRepo

  @Query(() => StoryPage)
  async stories(
    @Args() {limit, page, offset}: PageArgs
  ): Promise<StoryPageParams> {
    const [rows, count] = await this._storyRepo.findAndCount({
      skip: offset, take: limit, where: {isDraft: false}
    })

    return {rows, count, page, limit, offset}
  }

  @Query(() => Story)
  async story(@Ctx() ctx: Context, @Arg("slug") slug: string): Promise<Story> {
    const post = await this._storyRepo.findOne({where: {slug, isDraft: false}})

    if (!post) {
      ctx.throw(404)
    }

    return post
  }
}

export default StoryResolver
