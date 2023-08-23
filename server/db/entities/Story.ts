import {
  Entity,
  Property,
  ManyToMany,
  OneToMany,
  Collection
} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {RecordSoft} from "./RecordSoft.js"

import {Chapter} from "./Chapter.js"
import {Tag} from "./Tag.js"

// TODO: Implement tags, chapters, cover, and pulibsher fields
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
  @Property({type: "text"}) // FIXME: Chose precise type for description, MySQL has different variants for TEXT
  description!: string

  /**
   * URL-friendly & human-readable story identifier
   */
  @Property({type: "varchar", unique: true})
  slug!: string

  /**
   * Indicates if the story is available for anyone to read.
   *
   * `true` - means the story is available
   *
   * `false` - means the story is hidden
   */
  @Property({type: "boolean", default: true})
  isDraft = true

  @Property({type: "boolean", default: false})
  isFinished = true

  @Property({type: "smallint", unsigned: true})
  chaptersCount = 0

  /**
   * List of tags associated with the story
   */
  @ManyToMany(() => Tag, undefined, {eager: true})
  tags = new Collection<Tag, Story>(this)

  /**
   * List of the chapters associated with the story
   */
  @OneToMany(() => Chapter, chapter => chapter.story)
  chapters = new Collection<Chapter, Story>(this)
}

type StoryOptionalFields = PickKeys<Story, "isDraft" | "isFinished" | "slug">
