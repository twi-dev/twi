import Input from "parasprite/Input"

import TObjectID from "api/scalar/common/TObjectID"
import TChapterAddInput from "api/input/chapter/TChapterAddInput"

const TStoryChapterInput = Input("StoryChapterInput")
  .field({
    name: "id",
    type: TObjectID,
    required: true
  })
  .field({
    name: "content",
    type: TChapterAddInput,
    required: true
  })
.end()

export default TStoryChapterInput
