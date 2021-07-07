import {Entity, Column, ManyToOne} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Category} from "./Category"

@ObjectType()
@Entity()
export class Tag extends SoftRemovableEntity {
  @ManyToOne(() => Category, category => category.tags, {nullable: true})
  category!: Category | null

  /**
   * Name of the tag.
   */
  @Field({description: "Name of the tag."})
  @Column({unique: true})
  name!: string

  /**
   * Unique human-readable ID of the tag.
   */
  @Field({description: "Unique human-readable ID of the tag."})
  @Column({unique: true})
  slug!: string

  /**
   * Tag description.
   */
  @Field({nullable: true, description: "Tag description."})
  @Column({type: "text", nullable: true})
  description?: string
}
