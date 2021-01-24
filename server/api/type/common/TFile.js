import {GraphQLInt as TInt, GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TDates from "api/type/common/TDates"

import dates from "api/resolve/query/common/dates"

const TFile = Type("File")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  // TODO: Add a resolver to convert file path to URL
  .field({
    name: "path",
    type: TString,
    required: true
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
  .resolve({
    name: "dates",
    type: TDates,
    required: true,
    noArgs: true,
    handler: dates
  })
.end()

export default TFile
