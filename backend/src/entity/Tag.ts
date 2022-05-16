import {ObjectType, Field} from "type-graphql"
import {
  Entity,
  Property,
  ManyToOne,
  EntityRepositoryType
} from "@mikro-orm/core"

import type {MaybeNull} from "helper/type/MaybeNull"
import createSlug from "helper/util/createSlug"

import {TagRepo} from "repo/TagRepo"

import {BaseEntityWithDates} from "./BaseEntityWithDates"
import {Category} from "./Category"

@ObjectType()
@Entity({customRepository: () => TagRepo})
export class Tag extends BaseEntityWithDates {
  [EntityRepositoryType]: TagRepo

  /**
   * Category assigned to the tag.
   */
  @ManyToOne(() => Category, {nullable: true, onDelete: "set null"})
  category!: MaybeNull<Category>

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
  description!: MaybeNull<string>

  constructor(name: string, description: MaybeNull<string> = null) {
    super()

    this.name = name
    this.slug = createSlug(name)
    this.description = description
  }
}
