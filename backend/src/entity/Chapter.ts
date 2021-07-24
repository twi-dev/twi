import {ObjectType, Field, Int} from "type-graphql"
import {
  Entity,
  Property,
  ManyToOne,
  Filter,
  EntityRepositoryType
} from "@mikro-orm/core"

import {ChapterRepo} from "repo/ChapterRepo"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Story} from "./Story"

export enum ChapterFilters {
  PUBLISHED = "published",
  UNLISTED = "unlisted"
}

@ObjectType()
@Entity({customRepository: () => ChapterRepo})
@Filter<Chapter>({name: ChapterFilters.PUBLISHED, cond: {isDraft: false}})
@Filter<Chapter>({name: ChapterFilters.UNLISTED, cond: {isDraft: true}})
export class Chapter extends BaseEntitySoftRemovable {
  [EntityRepositoryType]: ChapterRepo

  @ManyToOne(() => Story, {onDelete: "cascade"})
  story!: Story

  /**
   * Chapter number within the story.
   *
   * The value will be "null" when the chapter is unlisted or soft-removed.
   */
  @Field(() => Int, {description: "Chapter number within the story."})
  @Property({columnType: "smallint", unsigned: true, nullable: true})
  number!: number | null

  /**
   * Chapter title.
   */
  @Field({description: "Chapter title."})
  @Property()
  title!: string

  /**
   * Chapter description.
   */
  @Field(() => String, {nullable: true, description: "Chapter description."})
  @Property({columnType: "text", nullable: true})
  description!: string | null

  /**
   * Chapter text.
   */
  @Field({description: "Chapter text."})
  @Property({columnType: "mediumtext"})
  text!: string

  /**
   * Indicates if the chapter is hidden from anyone to read.
   */
  @Field(() => Boolean, {
    description: "Indicates if the chapter is hidden from anyone to read."
  })
  @Property()
  isDraft: boolean = true
}
