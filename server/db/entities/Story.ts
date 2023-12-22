import {
  Entity,
  Property,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Collection,
  JsonType,
  type Opt
} from "@mikro-orm/mysql"

import type {StorySlug} from "../../lib/utils/slug/storySlug.js"
import type {
  ODescription
} from "../../trpc/types/slate/Description.js"

import {RecordSoft} from "./RecordSoft.js"
import {Chapter} from "./Chapter.js"
import {User} from "./User.js"
import {Tag} from "./Tag.js"

@Entity()
export class Story extends RecordSoft {
  /**
   * Story title
   */
  @Property({type: "varchar"})
  title!: string

  /**
   * Story description
   */
  @Property({type: JsonType, lazy: true})
  description!: ODescription

  /**
   * URL-friendly & human-readable unique identifier associated with the story
   */
  @Property({type: "varchar", unique: true})
  slug!: Opt<StorySlug>

  /**
   * Indicates whether the story is available for anyone to read.
   *
   * `true` - means the story is **hidden**
   *
   * `false` - means the story is **public**
   */
  @Property({type: "boolean", default: true})
  isDraft: Opt<boolean> = true

  /**
   * Indicates whether the story finished.
   *
   * It must have at least one chapter to be marked as finished.
   */
  @Property({type: "boolean", default: false})
  isFinished: Opt<boolean> = true

  /**
   * An amount of chapters within the story
   */
  @Property({type: "smallint", unsigned: true})
  chaptersCount: Opt<number> = 0

  /**
   * The user who published the story
   */
  @ManyToOne(() => User, {eager: true, nullable: false, deleteRule: "cascade"})
  publisher!: User

  /**
   * List of tags associated with the story
   */
  @ManyToMany(() => Tag, undefined, {lazy: true})
  tags = new Collection<Tag, Story>(this)

  /**
   * List of the chapters associated with the story
   */
  @OneToMany(() => Chapter, "story", {lazy: true})
  chapters = new Collection<Chapter, Story>(this)
}
