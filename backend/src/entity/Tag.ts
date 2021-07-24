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

  /**
   * Category assigned to the tag.
   */
  @ManyToOne(() => Category, {nullable: true, onDelete: "set null"})
  category!: Category | null

  /**
   * Name of the tag.
   */
  @Field()
  @Property({unique: true})
  name!: string

  /**
   * URL-firendly representation of the tag's name.
   */
  @Field()
  @Property({unique: true})
  slug!: string

  /**
   * An optional tag description.
   */
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
