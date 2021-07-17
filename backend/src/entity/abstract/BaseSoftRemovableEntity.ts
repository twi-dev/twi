import {DeleteDateColumn} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import {BaseEntityWithDates} from "entity/abstract/BaseEntityWithDates"

import Dates from "api/type/common/Dates"

@ObjectType({isAbstract: true})
export abstract class BaseSoftRemovableEntity extends BaseEntityWithDates {
  @DeleteDateColumn()
  deletedAt?: Date

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}

export default BaseSoftRemovableEntity
