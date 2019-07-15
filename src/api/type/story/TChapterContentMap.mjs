import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TChapterContentMap = Type("ChapterContentMap")
  .field({
    name: "md",
    type: TString,
    required: true,
    description: "Returns the chapter content as Markdown document."
  })
  .field({
    name: "html",
    type: TString,
    description: "Returns the chapter content as HTML document."
  })
  .field({
    name: "text",
    type: TString,
    description: "Returns the chapter content as plain text."
  })
.end()

export default TChapterContentMap
