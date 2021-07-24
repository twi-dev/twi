import {ObjectType, Field} from "type-graphql"

import Dates from "api/type/common/Dates"

@ObjectType()
class DatesWithDeleted extends Dates {
  @Field(() => Date, {nullable: true})
  deletedAt!: Date | null
}

export default DatesWithDeleted
