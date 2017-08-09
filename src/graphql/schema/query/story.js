import {GraphQLString as TString} from "graphql"

import TStory from "graphql/type/story/TStory"
import findStoryBySlug from "graphql/resolve/query/story/findStoryBySlug"

const resolve = {
  type: TStory,
  required: true,
  handler: findStoryBySlug
}

const slug = {
  type: TString,
  required: true
}

const args = {slug}

export {
  resolve,
  args
}
