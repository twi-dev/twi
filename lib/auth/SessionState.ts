import {Session} from "next-auth"

import type {Maybe} from "../utils/types/Maybe.js"

export interface SessionState {
  session: Ref<Maybe<Session>>
  refresh(): Promise<void>
}
