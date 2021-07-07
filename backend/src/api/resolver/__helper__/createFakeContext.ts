import createError from "http-errors"

export interface FakeSession {
  userId: number | null
}

export type FakeState = Record<string, unknown>

export interface FakeContext {
  session: FakeSession
  state: FakeState
  throw(...args: createError.UnknownError[]): never
}

export const CONTEXT_DEFAULTS: FakeContext = {
  session: {
    userId: null
  },
  state: {},
  throw(...args): never {
    throw createError(...args)
  }
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
