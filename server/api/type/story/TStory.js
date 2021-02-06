import Type from "parasprite/Type"

import TStoryChapterPage from "server/api/type/story/TStoryChapterPage"
import TStoryMinimal from "server/api/type/story/TStoryMinimal"
import TStoryTagPage from "server/api/type/story/TStoryTagPage"

import tags from "server/api/resolve/query/story/storyTags"
import chapers from "server/api/resolve/query/story/chapter/list"

const TStory = Type({
  name: "Story",
  type: "Represends available information about the stories",
  extends: TStoryMinimal
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
