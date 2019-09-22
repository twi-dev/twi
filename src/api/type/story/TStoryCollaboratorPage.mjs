import createPageType from "api/type/abstract/createPageType"

import TStoryCollaborator from "./TStoryCollaborator"

const TStoryCollaboratorPage = createPageType({
  type: [TStoryCollaborator, true]
})

export default TStoryCollaboratorPage
