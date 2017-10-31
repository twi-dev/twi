import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import concat from "core/helper/string/concatFromArray"

const deprecate = concat([
  "Deprecated because of migration ",
  "to the microservices architecture."
])

// TODO: replace fields names with each format namr
const TChapterContent = Type("ChapterContent")
  .field({
    name: "original",
    type: TString,
    required: true,
    deprecate
  })
  .field({
    name: "rendered",
    type: TString,
    required: true,
    deprecate
  })
.end()

export default TChapterContent
