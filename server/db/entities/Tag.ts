import {Entity, Property, ManyToOne} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {RecordSoft} from "./RecordSoft.js"
import {Category} from "./Category.js"

@Entity()
export class Tag extends RecordSoft<TagOptionalFields> {
  /**
   * Name of the tag
   */
  @Property({type: "varchar"})
  name!: string

  /**
   * URL-firendly representation of the tag's name
   */
  @Property({type: "varchar"})
  slug!: string

  /**
   * An optional tag description.
   */
  @Property({type: "text", nullable: true})
  description!: MaybeNull<string>

  /**
   * Category assigned to the tag
   */
  @ManyToOne(() => Category, {nullable: true, onDelete: "set null"})
  category!: MaybeNull<string>
}

type TagOptionalFields = PickKeys<Tag, never>
