import {ObjectType, Field} from "type-graphql"
import {
  Entity,
  Property,
  ManyToOne,
  EntityRepositoryType
} from "@mikro-orm/core"

import createSlug from "helper/util/createSlug"

import {TagRepo} from "repo/TagRepo"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Category} from "./Category"

@ObjectType()
@Entity({customRepository: () => TagRepo})
export class Tag extends BaseEntitySoftRemovable {
  [EntityRepositoryType]: TagRepo

  @ManyToOne(() => Category, {nullable: true})
  category!: Category | null

  @Field()
  @Property({unique: true})
  name!: string

  @Field()
  @Property({unique: true})
  slug!: string

  @Field(() => String, {nullable: true})
  @Property({columnType: "text", nullable: true})
  description!: string | null

  constructor(name: string, description: string | null = null) {
    super()

    this.name = name
    this.slug = createSlug(name)
    this.description = description
  }
}
