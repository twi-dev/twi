import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams} from "api/type/abstract/Page"

import {Chapter} from "entity/Chapter"

export type ChapterPageParams = PageParams<Chapter>

@ObjectType()
export class ChapterPage extends Page<Chapter> {
  @Field(() => [Chapter], {nullable: "items"})
  list(@Root() {rows = []}: ChapterPageParams): Chapter[] {
    return rows
  }
}
