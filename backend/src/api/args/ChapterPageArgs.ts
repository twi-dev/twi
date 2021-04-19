import {Field, ID} from "type-graphql"

import PageArgs from "./PageArgs"

class ChapterPageArgs extends PageArgs {
  @Field(() => ID)
  storyId!: string
}

export default ChapterPageArgs
