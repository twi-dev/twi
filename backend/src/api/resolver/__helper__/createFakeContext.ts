export interface FakeSession {
  userId: number | null
}

export type FakeState = Record<string, unknown>

export interface FakeContext {
  session: FakeSession
  state: FakeState
}

export const CONTEXT_DEFAULTS: FakeContext = {
  session: {
    userId: null
  },
  state: {}
}

export const createFakeContext = (
  {session, state = {}}: Partial<FakeContext> = {}
): FakeContext => ({
  session: {
    ...CONTEXT_DEFAULTS.session, ...session
  },
  state: {
    ...CONTEXT_DEFAULTS.state, ...state
  }
})
