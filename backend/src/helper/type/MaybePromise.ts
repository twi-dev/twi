/**
 * Creates the type that is either `T` or `Promise<T>`
 *
 * @example
 *
 * ```ts
 * import {MaybePromise} from "helper/type"
 *
 * MaybePromise<number> // -> number | Promise<Number>
 * ```
 */
export type MaybePromise<T> = T | Promise<T>

export default MaybePromise
