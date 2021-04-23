import {InputType, Field, ID} from "type-graphql"

@InputType({isAbstract: true})
class NodeInput {
  @Field(() => ID)
  id!: number
}

export default NodeInput
