/**
 * Creates the type that is either `T` or `undefined`
 *
 * @example
 *
 * ```ts
 * import {MaybeUndefined} from "helper/type"
 *
 * MaybeUndefined<number> // -> number | undefined
 * ```
 */
export type MaybeUndefined<T> = T | undefined
