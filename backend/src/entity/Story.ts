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

  /**
   * Returns the user who published the story.
   */
  @Field(() => User)
  @ManyToOne(() => User, {eager: true, nullable: false, onDelete: "cascade"})
  publisher!: User

  /**
   * Story cover.
   */
  @Field(() => File, {nullable: true})
  @OneToOne({
    entity: () => File,
    nullable: true,
    eager: true,
    onDelete: "set null"
  })
  cover!: File | null

  /**
   * List of the chapters associated with the story
   */
  @Field(() => [Chapter], {nullable: "items"})
  @OneToMany(() => Chapter, chapter => chapter.story)
  chapters = new Collection<Chapter, Story>(this)

  /**
   * List of the story tags.
   */
  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, undefined, {eager: true})
  tags = new Collection<Tag, Story>(this)

  /**
   * Story title.
   */
  @Field()
  @Property()
  title!: string

  /**
   * Story description.
   */
  @Field()
  @Property({columnType: "text"})
  description!: string

  /**
   * URL-friendly story identifier.
   */
  @Field()
  @Property({unique: true})
  slug!: string

  /**
   * Indicates if the story is hidden from anyone to read.
   */
  @Field(() => Boolean)
  @Property()
  isDraft: boolean = true

  /**
   * Indicates if the story finished.
   * It must have at least one chapter to be marked as finished.
   */
  @Field(() => Boolean, {
    description: "Indicates if the story is finished. "
      + "It **must** have at least one chapter to be marked as finished."
  })
  @Property()
  isFinished: boolean = false

  /**
   * An amount of chapters within the story.
   */
  @Property({type: "smallint", unsigned: true})
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
