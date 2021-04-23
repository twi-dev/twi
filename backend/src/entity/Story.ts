import {ObjectType, Field} from "type-graphql"
import {format} from "date-fns"
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeUpdate
} from "typeorm"

import createSlug from "helper/util/createSlug"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import User from "./User"
import File from "./File"

const SLUG_DATE_MASK = "yyyy/MM/dd"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
  #slug!: string

  #title!: string

  @Column({unsigned: true})
  publisherId!: number

  @Column({unsigned: true, nullable: true})
  coverId?: number

  @Field(() => User)
  @ManyToOne(() => User, {onDelete: "CASCADE", eager: true})
  publisher!: User

  @Field(() => File, {nullable: true})
  @OneToOne(() => User, {eager: true})
  @JoinColumn()
  cover?: File

  @Field()
  @Column()
  get title(): string {
    return this.#title
  }

  set title(value: string) {
    this.slug = value
    this.#title = value
  }

  @Field()
  @Column({type: "text"})
  description!: string

  @Field()
  @Column({unique: true})
  get slug(): string {
    return this.#slug
  }

  set slug(value: string) {
    const formatted = format(this.createdAt, SLUG_DATE_MASK)

    this.#slug = `${formatted}/${createSlug(value)}`
  }

  @Field()
  @Column({default: true})
  isDraft!: boolean

  @Field()
  @Column({default: false})
  isFinished!: boolean

  @Field()
  @Column({type: "tinyint", unsigned: true, default: 0})
  chaptersCount!: number

  @BeforeUpdate()
  updateIsFinished() {
    if (this.isFinished === true && this.chaptersCount < 1) {
      this.isFinished = false
    }
  }

  @BeforeUpdate()
  updateChaptersCount() {
    if (this.chaptersCount < 0) {
      this.chaptersCount = 0
    }
  }
}

export default Story
