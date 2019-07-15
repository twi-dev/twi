import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TChapterInput = Input("ChapterInput")
  .field({
    name: "title",
    type: TString,
    required: true
  })
  .field({
    name: "content",
    type: TString,
    required: true
  })
.end()

export default TChapterInput
