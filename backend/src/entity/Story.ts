import {ObjectType, Field} from "type-graphql"
import {
  Filter,
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  Collection,
  EntityRepositoryType
} from "@mikro-orm/core"
import {isEmpty} from "lodash"

import {StoryRepo} from "repo/StoryRepo"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Chapter} from "./Chapter"
import {User} from "./User"
import {File} from "./File"
import {Tag} from "./Tag"

export enum StoryFilters {
  PUBLISHED = "published",
  UNLISTED = "unlisted",
  FINISHED = "finished",
  UNFINISHED = "unfinished"
}

@ObjectType()
@Entity({customRepository: () => StoryRepo})
@Filter<Story>({name: StoryFilters.PUBLISHED, cond: {isDraft: false}})
@Filter<Story>({name: StoryFilters.UNLISTED, cond: {isDraft: true}})
@Filter<Story>({name: StoryFilters.FINISHED, cond: {isFinished: true}})
@Filter<Story>({name: StoryFilters.UNFINISHED, cond: {isFinished: false}})
export class Story extends BaseEntitySoftRemovable {
  [EntityRepositoryType]: StoryRepo

  @Field(() => User)
  @ManyToOne({eager: true, nullable: false})
  publisher!: User

  @Field(() => File, {nullable: true})
  @OneToOne({entity: () => File, nullable: true, eager: true})
  cover!: File | null

  @Field(() => [Chapter], {nullable: "items"})
  @OneToMany(() => Chapter, chapter => chapter.story)
  chapters = new Collection<Chapter, Story>(this)

  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, undefined, {eager: true})
  tags = new Collection<Tag, Story>(this)

  @Field()
  @Property()
  title!: string

  @Field()
  @Property({columnType: "text"})
  description!: string

  @Field()
  @Property({unique: true})
  slug!: string

  @Field(() => Boolean)
  @Property()
  isDraft: boolean = true

  @Field(() => Boolean)
  @Property()
  isFinished: boolean = false

  @Property({type: "tinyint", unsigned: true})
  chaptersCount: number = 0

  constructor(title: string, description: string, tags?: Tag[]) {
    super()

    this.title = title
    this.description = description

    if (Array.isArray(tags) && !isEmpty(tags)) {
      this.tags.set(tags)
    }
  }
}
