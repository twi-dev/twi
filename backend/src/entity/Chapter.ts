import {Entity, Property, ManyToOne, Filter} from "@mikro-orm/core"
import {ObjectType, Field, Int} from "type-graphql"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Story} from "./Story"

export enum ChapterFilters {
  PUBLISHED = "published",
  UNLISTED = "unlisted"
}

@ObjectType()
@Entity()
@Filter<Chapter>({name: ChapterFilters.PUBLISHED, cond: {isDraft: false}})
@Filter<Chapter>({name: ChapterFilters.UNLISTED, cond: {isDraft: true}})
export class Chapter extends BaseEntitySoftRemovable {
  @ManyToOne(() => Story)
  story!: Story

  @Field(() => Int)
  @Property({columnType: "smallint", unsigned: true, nullable: true})
  number!: number | null

  @Field()
  @Property()
  title!: string

  @Field(() => String, {nullable: true})
  @Property({columnType: "text", nullable: true})
  description!: string | null

  @Field()
  @Property({columnType: "mediumtext"})
  text!: string

  @Field(() => Boolean)
  @Property()
  isDraft: boolean = true
}
