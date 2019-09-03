import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TChapter from "api/type/story/TChapter"

import TStoryMinimal from "api/type/story/TStoryMinimal"
import TStoryCollaborator from "api/type/story/TStoryCollaborator"

// import chapers from "../../resolve/query/story/chapers"

// import currentCollaborator from "api/resolve/query/story/currentCollaborator"

const TStory = Type({
  name: "Story",
  type: "Represends available information about the stories",
  extends: TStoryMinimal
})
  .field({
    name: "collaborators",
    type: [TStoryCollaborator, true]
  })
  // .resolve({
  //   name: "currentCollaborator",
  //   type: TStoryCollaborator,
  //   handler: currentCollaborator,
  //   noArgs: true
  // })
  .resolve({
    name: "chapters",
    type: [TChapter, true],
    required: true,
    // handler: chapers
    handler() { }
  })
    .arg({
      name: "cursor",
      type: TInt
    })
  .end()
.end()

export default TStory
