import createPageType from "api/type/abstract/createPageType"

import TAuthSession from "api/type/auth/TAuthSession"

const TAuthSessionPage = createPageType({
  type: [TAuthSession, true]
})

export default TAuthSessionPage
