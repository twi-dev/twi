import type {MaybeUndefined} from "./MaybeUndefined"
import type {MaybeNull} from "./MaybeNull"

/**
 * Creates the type that is either `T`, or `null`, or `undefined`
 *
 * @example
 *
 * ```ts
 * import {MaybeNull} from "helper/type"
 *
 * MaybeNull<number> // -> number | null | undefimed
 * ```
 */
export type MaybeNullish<T> = MaybeNull<T> | MaybeUndefined<T>
