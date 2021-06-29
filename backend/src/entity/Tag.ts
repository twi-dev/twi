import {Entity, Column, ManyToOne} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Category} from "./Category"

@ObjectType()
@Entity()
export class Tag extends SoftRemovableEntity {
  @ManyToOne(() => Category, category => category.tags, {nullable: true})
  category!: Category | null

  @Field(() => String)
  @Column({unique: true})
  name!: string

  @Field(() => String)
  @Column({unique: true})
  slug!: string

  @Field({nullable: true})
  @Column({type: "text", nullable: true})
  description?: string
}
