import {URL} from "url"

import {Field, ObjectType} from "type-graphql"
import {Entity, Column} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

@ObjectType()
@Entity()
export class File extends SoftRemovableEntity {
  /**
   * Relative path to the file on a disk or its key in remote storage.
   * Must be unique.
   */
  @Column({unique: true})
  path!: string

  /**
   * File name with extension.
   */
  @Field({description: "File name with extension."})
  @Column()
  name!: string

  /**
   * SHA 512 hash based on file's content.
   */
  @Field({description: "SHA 512 hash based on file's content."})
  @Column({type: "char", length: 128})
  hash!: string

  /**
   * MIME type of the file.
   */
  @Field({description: "MIME type of the file."})
  @Column()
  mime!: string

  /**
   * Full address of the file on static server.
   */
  @Field(() => String, {
    description: "Full address of the file on static server."
  })
  get url(): string {
    return new URL(this.path, process.env.SERVER_ADDRESS).toString()
  }
}
