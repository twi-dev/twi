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
   * Name with extension
   */
  @Field()
  @Column()
  name!: string

  /**
   * SHA 512 hash based on file's content
   */
  @Field()
  @Column({type: "char", length: 128})
  hash!: string

  /**
   * MIME type of the file
   */
  @Field()
  @Column()
  mime!: string

  @Field(() => String)
  get url(): string {
    return new URL(this.path, process.env.SERVER_ADDRESS).toString()
  }
}
