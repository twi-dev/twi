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
  @ManyToOne(() => Story, {onDelete: "cascade"})
  story!: Story

  @Property({type: "smallint", unsigned: true, nullable: true})
  number!: MaybeNull<number>

  @Property({type: "varchar"})
  title!: string

  @Property({type: "text"})
  description!: string

  @Property({type: JsonType})
  content!: Record<string, unknown> // TODO: Adjust type to slate nodes

  @Property({type: "boolean", default: false})
  isDraft = true
}

type ChapterOptionalFields = PickKeys<Chapter, never>
