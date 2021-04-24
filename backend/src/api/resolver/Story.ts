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
import {Context} from "koa"
import {set} from "lodash"

import {StoryRepo} from "repo/Story"
import {UserRepo} from "repo/User"

import {Story} from "entity/Story"
import {User} from "entity/User"

import {StoryPage, StoryPageParams} from "api/type/story/StoryPage"

import PageArgs from "api/args/PageArgs"
import StoryAddInput from "api/input/story/Add"
import StoryUpdateInput from "api/input/story/Update"

import NotFound from "api/middleware/NotFound"

@Resolver(() => Story)
class StoryResolver {
  @InjectRepository()
  private _storyRepo!: StoryRepo

  @InjectRepository()
  private _userRepo!: UserRepo

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

      @Arg("storyId")
      storyId: number
    ): Promise<number> {
    const story = await this._storyRepo.findOne(storyId)

    if (!story) {
      ctx.throw(400)
    }

    return this._storyRepo.softRemove(story).then(() => storyId)
  }
}

export default StoryResolver
