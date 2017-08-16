import {GraphQLString as TString} from "graphql"

import TStory from "graphql/type/story/TStory"
import findStoryBySlug from "graphql/resolve/query/story/findStoryBySlug"

const resolve = {
  type: TStory,
  required: true,
  handler: findStoryBySlug,
  description: "Get one story by it slug."
}

const slug = {
  type: TString,
  required: true,
  description: (
    "An unique story full/short identifer that based on name + random string."
  )
}

const args = {slug}

export {
  resolve,
  args
}
