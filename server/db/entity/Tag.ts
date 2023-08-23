import {Entity, Property, ManyToOne} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {RecordSoft} from "./RecordSoft.js"
import {Category} from "./Category.js"

@Entity()
export class Tag extends RecordSoft<TagOptionalFields> {
  @ManyToOne(() => Category, {nullable: true, onDelete: "set null"})
  category!: MaybeNull<string>

  @Property({type: "varchar"})
  name!: string

  @Property({type: "varchar"})
  slug!: string

  @Property({type: "text", nullable: true})
  description!: MaybeNull<string>
}

type TagOptionalFields = PickKeys<Tag, never>
