import {
  Entity,
  Property,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Collection
} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import type {StorySlug} from "../../lib/utils/slug/storySlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Chapter} from "./Chapter.js"
import {User} from "./User.js"
import {Tag} from "./Tag.js"

@Entity()
export class Story extends RecordSoft<StoryOptionalFields> {
  /**
   * Story title
   */
  @Property({type: "varchar"})
  title!: string

  /**
   * Story description
   */
  @Property({type: "text", lazy: true}) // FIXME: Chose precise type for description, MySQL has different variants for TEXT
  description!: string

  /**
   * URL-friendly & human-readable story identifier
   */
  @Property({type: "varchar", unique: true})
  slug!: StorySlug

  /**
   * Indicates whether the story is available for anyone to read.
   *
   * `true` - means the story is **hidden**
   *
   * `false` - means the story is **public**
   */
  @Property({type: "boolean", default: true})
  isDraft = true

  /**
   * Indicates whether the story finished.
   *
   * It must have at least one chapter to be marked as finished.
   */
  @Property({type: "boolean", default: false})
  isFinished = true

  /**
   * An amount of chapters within the story
   */
  @Property({type: "smallint", unsigned: true})
  chaptersCount = 0

  /**
   * The user who published the story
   */
  @ManyToOne(() => User, {eager: true, nullable: false, onDelete: "cascade"})
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

type StoryOptionalFields = PickKeys<Story, "isDraft" | "isFinished" | "slug">
