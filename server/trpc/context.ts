import {H3Event} from "h3"

import {isPlainObject} from "../../lib/utils/isPlainObject.js"

const createCallerContextKey = "__$$createCallerContext$$__"

export interface BaseContext { }

export interface CreateCallerContext extends BaseContext {
  [createCallerContextKey]: true
}

export interface H3Context {
  event: H3Event
}

export type GlobalContext =
  | BaseContext
  | CreateCallerContext

export const isH3Context = (
  value: unknown
): value is H3Context => isPlainObject(value)
  && "event" in value
  && value.event instanceof H3Event

export const createContext = (
  event?: H3Event
) => event instanceof H3Event ? {event} : {}
