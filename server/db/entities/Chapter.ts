import {
  Entity,
  Property,
  ManyToOne,
  JsonType,
  Unique,
  Filter
} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {RecordSoft} from "./RecordSoft.js"
import {Story} from "./Story.js"

export enum ChapterFilters {
  Published = "published",
  Draft = "draft"
}

@Entity()
@Filter<Chapter>({name: ChapterFilters.Published, cond: {isDraft: false}})
@Filter<Chapter>({name: ChapterFilters.Draft, cond: {isDraft: true}})
export class Chapter extends RecordSoft<ChapterOptionalProps> {
  /**
   * Chapter title
   */
  @Property({type: "varchar"})
  title!: string

  /**
   * Chapter description
   */
  @Property({type: "text", lazy: true})
  description!: string

  /**
   * Chapter content.
   *
   * This field contains collection of [`Slate`](https://www.slatejs.org) nodes
   */
  @Property({type: JsonType, lazy: true})
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

  @Property({type: "varchar"})
  @Unique()
  slug!: string

  /**
   * Story associated with the chapter
   */
  @ManyToOne(() => Story, {onDelete: "cascade"})
  story!: Story
}

type ChapterOptionalProps = PickKeys<Chapter, "order" | "isDraft">
