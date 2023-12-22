import {
  Entity,
  Property,
  ManyToOne,
  JsonType,
  Unique,
  Filter,
  type Opt
} from "@mikro-orm/mysql"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"

import type {
  ORootElements
} from "../../trpc/types/slate/RootElements.js"
import type {ODescription} from "../../trpc/types/slate/Description.js"

import {RecordSoft} from "./RecordSoft.js"
import {Story} from "./Story.js"

export enum ChapterFilters {
  Published = "published",
  Draft = "draft"
}

@Entity()
@Filter<Chapter>({name: ChapterFilters.Published, cond: {isDraft: false}})
@Filter<Chapter>({name: ChapterFilters.Draft, cond: {isDraft: true}})
export class Chapter extends RecordSoft {
  /**
   * Chapter title
   */
  @Property({type: "varchar"})
  title!: string

  /**
   * Chapter description
   */
  @Property({type: JsonType, lazy: true})
  description!: ODescription

  /**
   * Chapter content.
   *
   * This field contains collection of [`Slate`](https://www.slatejs.org) nodes
   */
  @Property({type: JsonType, lazy: true})
  content!: ORootElements

  /**
   * Indicates if the chapter is hidden from anyone to read
   *
   * `true` - means chapter is **hidden**
   *
   * `false` - means chapter is **public**
   */
  @Property({type: "boolean", default: true})
  isDraft: Opt<boolean> = true

  /**
   * Chapter order number within the story.
   *
   * The value will be "null" when the chapter is unlisted or soft-removed
   */
  @Property({type: "smallint", unsigned: true, nullable: true})
  order!: MaybeNull<Opt<number>>

  @Property({type: "varchar"})
  @Unique()
  slug!: Opt<string>

  /**
   * Story associated with the chapter
   */
  @ManyToOne(() => Story, {deleteRule: "cascade"})
  story!: Story
}
