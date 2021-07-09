import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams, PageResult} from "api/type/abstract/Page"

import {Chapter} from "entity/Chapter"

export type ChapterPageParams = PageParams<Chapter>

export type ChapterPageResult = PageResult<ChapterPage>

@ObjectType()
export class ChapterPage extends Page<Chapter> {
  @Field(() => [Chapter], {
    nullable: "items",
    description: "Returns the list of chapters."
  })
  list(@Root() {rows}: ChapterPageParams): Chapter[] {
    return rows
  }
}
