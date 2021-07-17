import {ObjectType, Field, ID} from "type-graphql"
import {PrimaryGeneratedColumn} from "typeorm"

@ObjectType({isAbstract: true})
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({type: "int", unsigned: true})
  id!: number
}
