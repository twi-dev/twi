import {GraphQLInt as TInt, GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TObjectID from "api/scalar/common/TObjectID"
import TDates from "api/type/common/TDates"

const TFile = Type("File")
  .field({
    name: "id",
    type: TObjectID,
    require: true
  })
  // TODO: Add a resolver to convert file path to URL
  .field({
    name: "path",
    type: TString,
    require: true
  })
  .field({
    name: "mime",
    type: TString,
    required: true
  })
  .field({
    name: "hash",
    type: TString,
    required: true
  })
  // Add a resolver with types convertation
  .field({
    name: "size",
    type: TInt,
    required: true
  })
  .field({
    name: "dates",
    type: TDates,
    required: true
  })
.end()

export default TFile
