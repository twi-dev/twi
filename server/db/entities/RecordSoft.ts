import {Property} from "@mikro-orm/mysql"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"

import {Record} from "./Record.js"

export abstract class RecordSoft extends Record {
  /**
   * Date and time the record has been marked as deleted
   */
  @Property({type: "datetime", nullable: true})
  deletedAt: MaybeNull<Date> = null
}
