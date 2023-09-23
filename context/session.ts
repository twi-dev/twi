import type {SessionState} from "../lib/auth/SessionState.js"
import {createContext} from "../lib/context/createContext.js"

export const {
  provideContext: provideSessionContext,
  useContext: useSessionContext
} = createContext<SessionState>()
