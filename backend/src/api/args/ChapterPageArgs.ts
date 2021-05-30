import {ArgsType, Field, ID} from "type-graphql"

import PageArgs from "./PageArgs"

@ArgsType()
class ChapterPageArgs extends PageArgs {
  #storyId!: number

  set storyId(value: string | number) {
    this.#storyId = Number(value)
  }

  @Field(() => ID)
  get storyId(): number {
    return this.#storyId
  }
}

export default ChapterPageArgs
