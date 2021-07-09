import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams, PageResult} from "api/type/abstract/Page"

import {Story} from "entity/Story"

export type StoryPageParams = PageParams<Story>

export type StoryPageResult = PageResult<StoryPage>

@ObjectType()
export class StoryPage extends Page<Story> {
  @Field(() => [Story], {
    nullable: "items",
    description: "Returns the list of stories."
  })
  list(@Root() {rows}: StoryPageParams): Story[] {
    return rows
  }
}
