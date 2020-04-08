import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TFileInput from "api/input/common/TFileInput"
import TStoryChapterInput from "api/input/story/TStoryChapterInput"

const TStoryCreateInput = Input("StoryCreateInput")
  .field({
    name: "title",
    type: TString,
    required: true
  })
  .field({
    name: "description",
    type: TString,
    required: true
  })
  .field({
    name: "cover",
    type: TFileInput
  })
  .field({
    name: "characters",
    type: [TInt, true],
    deprecate: "Use Tags intead of this field."
  })
  .field({
    name: "genres",
    type: [TInt, true],
    deprecate: "Use Tags intead of this field."
  })
  .field({
    name: "chapters",
    type: [TStoryChapterInput, true]
  })
.end()

export default TStoryCreateInput
