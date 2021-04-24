import {InputType, Field} from "type-graphql"

import Node from "api/input/common/Node"
import ChapterAddInput from "api/input/chapter/Add"

@InputType()
class StoryChapterAddInput extends Node {
  @Field()
  chapter!: ChapterAddInput
}

export default StoryChapterAddInput
