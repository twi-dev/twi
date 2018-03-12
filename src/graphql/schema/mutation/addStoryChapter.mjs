import {GraphQLID as TID} from "graphql"

import TChapter from "graphql/type/story/TChapter"
import TChapterInput from "graphql/input/story/TChapterInput"
import addChapter from "graphql/resolve/mutation/story/addChapter"

const resolve = {
  type: TChapter,
  required: true,
  desription: "Add new chapter to an exiting Story.",
  handler: addChapter
}

const storyId = {
  type: TID,
  required: true,
  description: "ID of a Story to which will be added a chapter."
}

const chapter = {
  type: TChapterInput,
  required: true,
  description: "A chapter information."
}

const args = {storyId, chapter}

export {resolve, args}
