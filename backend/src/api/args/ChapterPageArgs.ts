import {ArgsType, Field, ID} from "type-graphql"

import PageArgs from "./PageArgs"

@ArgsType()
class ChapterPageArgs extends PageArgs {
  @Field(() => ID)
  storyId!: string
}

export default ChapterPageArgs
