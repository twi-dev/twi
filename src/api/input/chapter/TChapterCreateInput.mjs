import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TChapterCreateInput = Input("ChapterCreateInput")
  .field({
    name: "title",
    type: TString
  })
  .field({
    name: "content",
    type: TString,
    required: true
  })
.end()

export default TChapterCreateInput
