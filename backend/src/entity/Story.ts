import {ObjectType, Field} from "type-graphql"
import {Entity, Column, OneToOne, JoinColumn} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {User} from "./User"
import {File} from "./File"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
  @Column({unsigned: true})
  publisherId!: number

  @Column({unsigned: true})
  coverId?: number

  @Field(() => User)
  @OneToOne(() => User, {eager: true})
  @JoinColumn()
  publisher!: User

  @Field(() => File, {nullable: true})
  @OneToOne(() => User, {eager: true})
  @JoinColumn()
  cover: File

  @Column()
  title!: string

  @Column()
  description!: string

  @Column({update: false})
  slug: string

  @Column({default: true})
  isDraft!: boolean

  @Column({default: false})
  isFinished!: boolean

  @Column({type: "tinyint", unsigned: true})
  chaptersCount!: number
}

export default Story
