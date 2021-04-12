import {Entity, Column, OneToOne, ManyToOne, JoinColumn} from "typeorm"
import {ObjectType, Field} from "type-graphql"
import {format} from "date-fns"

import createSlug from "helper/util/createSlug"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import User from "./User"
import File from "./File"

const SLUG_DATE_MASK = "yyyy/MM/dd"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
  private _slug: string

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
  title!: string

  @Field()
  @Column({type: "text"})
  description!: string

  @Field()
  @Column({update: false, unique: true})
  get slug(): string {
    return this._slug
  }

  set slug(value: string) {
    const formatted = format(this.createdAt, SLUG_DATE_MASK)

    this._slug = `${formatted}/${createSlug(value)}`
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
}

export default Story
