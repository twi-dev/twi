/**
 * Creates the type that is either `T` or `null`
 *
 * @example
 *
 * ```ts
 * import {MaybeNull} from "helper/type"
 *
 * MaybeNull<number> // -> number | null
 * ```
 */
export type MaybeNull<T> = T | null
