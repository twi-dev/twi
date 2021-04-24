import {InputType, Field, ID} from "type-graphql"

@InputType({isAbstract: true})
abstract class NodeInput {
  @Field(() => ID)
  id!: number
}

export default NodeInput
