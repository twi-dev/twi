import {Entity, Property, ManyToOne, JsonType, Filter} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {RecordSoft} from "./RecordSoft.js"
import {Story} from "./Story.js"

export enum ChapterFilters {
  PUBLISHED = "published",
  DRAFT = "DRAFT"
}

@Entity()
@Filter<Chapter>({name: ChapterFilters.PUBLISHED, cond: {isDraft: false}})
@Filter<Chapter>({name: ChapterFilters.DRAFT, cond: {isDraft: true}})
export class Chapter extends RecordSoft<ChapterOptionalFields> {
  /**
   * Chapter title
   */
  @Property({type: "varchar"})
  title!: string

  /**
   * Chapter description
   */
  @Property({type: "text"})
  description!: string

  /**
   * Chapter content.
   *
   * This field contains collection of [`Slate`](https://www.slatejs.org) nodes
   */
  @Property({type: JsonType})
  content!: Record<string, unknown> // TODO: Adjust type to slate nodes

  /**
   * Indicates if the chapter is hidden from anyone to read
   *
   * `true` - means chapter is **hidden**
   *
   * `false` - means chapter is **public**
   */
  @Property({type: "boolean", default: false})
  isDraft = true

  /**
   * Chapter order number within the story.
   *
   * The value will be "null" when the chapter is unlisted or soft-removed
   */
  @Property({type: "smallint", unsigned: true, nullable: true})
  order!: MaybeNull<number>

  @Property({type: "varchar", unique: true})
  slug!: string

  /**
   * Story associated with the chapter
   */
  @ManyToOne(() => Story, {onDelete: "cascade"})
  story!: Story
}

type ChapterOptionalFields = PickKeys<Chapter, "order" | "isDraft">
