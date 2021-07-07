import createError from "http-errors"

export interface FakeSession {
  userId: number | null
}

export type FakeState = Record<string, unknown>

export interface FakeContext {
  session: FakeSession
  state: FakeState
  throw: typeof createError
}

export const CONTEXT_DEFAULTS: FakeContext = {
  session: {
    userId: null
  },
  state: {},
  throw: createError
}

export const createFakeContext = (
  {session, state = {}}: Partial<Omit<FakeContext, "throw">> = {}
): FakeContext => ({
  ...CONTEXT_DEFAULTS,

  session: {
    ...CONTEXT_DEFAULTS.session, ...session
  },
  state: {
    ...CONTEXT_DEFAULTS.state, ...state
  }
})
