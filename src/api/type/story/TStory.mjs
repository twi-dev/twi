import Type from "parasprite/Type"

import TStoryCollaboratorPage from "api/type/story/TStoryCollaboratorPage"
import TStoryChapterPage from "api/type/story/TStoryChapterPage"
import TStoryMinimal from "api/type/story/TStoryMinimal"
import TStoryTagPage from "api/type/story/TStoryTagPage"

import tags from "api/resolve/query/story/storyTags"
import chapers from "api/resolve/query/story/chapter/list"
import collaborators from "api/resolve/query/story/collaborators"
import currentCollaborator from "api/resolve/query/story/currentCollaborator"

const TStory = Type({
  name: "Story",
  type: "Represends available information about the stories",
  extends: TStoryMinimal
})
  .resolve({
    name: "currentCollaborator",
    type: TStoryCollaboratorPage,
    handler: currentCollaborator,
    noArgs: true
  })
  .resolve({
    name: "collaborators",
    type: TStoryCollaboratorPage,
    required: true,
    noArgs: true,
    handler: collaborators
  })
  .resolve({
    name: "chapters",
    type: TStoryChapterPage,
    required: true,
    handler: chapers,
    noArgs: true
  })
  .resolve({
    name: "tags",
    type: TStoryTagPage,
    noArgs: true,
    required: true,
    handler: tags
  })
.end()

export default TStory
