import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TChapterUpdateInput = Input("ChapterUpdateInput")
  .field({
    name: "name",
    type: TString
  })
  .field({
    name: "content",
    type: TString
  })
.end()

export default TChapterUpdateInput
