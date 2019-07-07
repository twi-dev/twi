import TSession from "api/type/auth/TAuthSession"

import sessions from "api/resolve/query/auth/sessions"

const resolve = {
  type: TSession,
  handler: sessions,
  required: true
}

export {resolve}
