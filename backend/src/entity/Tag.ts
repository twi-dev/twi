import {Entity, Column, ManyToOne} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import createSlug from "helper/util/createSlug"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Category} from "./Category"

@ObjectType()
@Entity()
export class Tag extends SoftRemovableEntity {
  #name!: string

  @Column({unsigned: true, nullable: true})
  categoryId?: number

  @ManyToOne(() => Category, {eager: true, nullable: true})
  category?: Category | null

  set name(value: string) {
    this.#name = value
    this.slug = createSlug(value)
  }

  @Field(() => String)
  @Column({unique: true})
  get name(): string {
    return this.#name
  }

  @Field(() => String)
  @Column({unique: true})
  slug!: string

  @Field({nullable: true})
  @Column({type: "text", nullable: true})
  description?: string
}
