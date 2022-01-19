/**
 * Unwraps type of value that the Promise is resolving
 *
 * @example
 *
 * ```ts
 * import {UnwrapPromise} from "helper/type"
 *
 * UnwrapPromise<Promise<string>> // -> string
 * UnwrapPromise<string> // -> string
 * ```
 */
export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T

export default UnwrapPromise
