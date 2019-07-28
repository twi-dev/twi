import remove from "api/resolve/mutation/story/remove"
import TObjectID from "api/scalar/common/TObjectID"

const resolve = {
  type: TObjectID,
  required: true,
  handler: remove
}

const args = {
  storyId: [TObjectID, true]
}

export {resolve, args}
