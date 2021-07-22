import {URL} from "url"

import {Entity, Property} from "@mikro-orm/core"
import {ObjectType, Field} from "type-graphql"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"

export interface FileInterface {
  /**
   * Relative path to the file on a disk or its key in remote storage.
   * Must be unique.
   */
  key: string

  /**
   * File name with extension.
   */
  name: string

  /**
   * SHA 512 hash based on file's content.
   */
  hash: string

  /**
   * MIME type of the file.
   */
  mime: string
}

@ObjectType()
@Entity()
export class File extends BaseEntitySoftRemovable implements FileInterface {
  /**
   * Relative path to the file on a disk or its key in remote storage.
   * Must be unique.
   */
  @Field()
  @Property({unique: true})
  key!: string

  /**
   * File name with extension.
   */
  @Field()
  @Property()
  name!: string

  /**
   * SHA 512 hash based on file's content.
   */
  @Field()
  @Property({columnType: "char(128)"})
  hash!: string

  /**
   * MIME type of the file.
   */
  @Field()
  @Property()
  mime!: string

  constructor(file: FileInterface) {
    super()

    this.key = file.key
    this.name = file.name
    this.hash = file.hash
    this.mime = file.mime
  }

  /**
   * Full address of the file on static server.
   */
  @Field(() => String)
  get url(): string {
    return new URL(this.key, process.env.SERVER_ADDRESS).toString()
  }
}
