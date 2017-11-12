import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TChapter from "./TChapter"

import findChaptersById from "../../resolve/query/story/findChaptersById"

import TStoryMinimal from "./TStoryMinimal"
import TStoryCollaborator from "./TStoryCollaborator"

const TStory = Type({
  name: "Story",
  type: "Represends available information about the stories",
  extends: TStoryMinimal
})
  .field({
    name: "collaborators",
    type: [TStoryCollaborator, true]
  })
  .resolve({
    name: "chapters",
    type: [TChapter, true],
    required: true,
    handler: findChaptersById
  })
    .arg({
      name: "cursor",
      type: TInt
    })
  .end()
.end()

export default TStory
