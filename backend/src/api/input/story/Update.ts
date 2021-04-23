import {InputType, Field} from "type-graphql"

import Node from "api/input/common/Node"

@InputType()
class StoryUpdateInput extends Node {
  @Field({nullable: true})
  title?: string

  @Field({nullable: true})
  description?: string

  @Field({nullable: true})
  isDraft?: boolean

  @Field({nullable: true})
  isFinished?: boolean
}

export default StoryUpdateInput
