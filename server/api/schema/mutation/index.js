import {GraphQLObjectType as Output} from "graphql"

/* eslint-disable max-len */
import storyChapterCreate from "server/api/schema/mutation/storyChapterCreate"
import storyChapterRemove from "server/api/schema/mutation/storyChapterRemove"
import storyChapterUpdate from "server/api/schema/mutation/storyChapterUpdate"
import storycreate from "server/api/schema/mutation/storyCreate"
import storyRemove from "server/api/schema/mutation/storyRemove"
import storyUpdate from "server/api/schema/mutation/storyUpdate"
import viewerAvatarRemove from "server/api/schema/mutation/viewerAvatarRemove"
import viewerAvatarUpdate from "server/api/schema/mutation/viewerAvatarUpdate"
import viewerContactsUpdate from "server/api/schema/mutation/viewerContactsUpdate"
import viewerPasswordUpdate from "server/api/schema/mutation/viewerPasswordUpdate"
/* eslint-enable max-len */

const TMutation = new Output({
  name: "Mutation",
  fields: {
    storyChapterCreate,
    storyChapterRemove,
    storyChapterUpdate,
    storycreate,
    storyRemove,
    storyUpdate,
    viewerAvatarRemove,
    viewerAvatarUpdate,
    viewerContactsUpdate,
    viewerPasswordUpdate
  }
})

export default TMutation
