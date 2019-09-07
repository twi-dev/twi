import Type from "parasprite/Type"

import TStoryChapter from "api/type/story/TStoryChapter"

import TStoryMinimal from "api/type/story/TStoryMinimal"

import chapers from "api/resolve/query/story/chaptersFromStory"

// import currentCollaborator from "api/resolve/query/story/currentCollaborator"

const TStory = Type({
  name: "Story",
  type: "Represends available information about the stories",
  extends: TStoryMinimal
})
  // .resolve({
  //   name: "currentCollaborator",
  //   type: TStoryCollaborator,
  //   handler: currentCollaborator,
  //   noArgs: true
  // })
  .resolve({
    name: "chapters",
    type: [TStoryChapter, true],
    required: true,
    handler: chapers
  })
  .end()
.end()

export default TStory
