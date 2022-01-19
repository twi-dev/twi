import UnwrapPromise from "./UnwrapPromise"

/**
 * Unwraps result of the methods defined on given object.
 * It also unwraps any Promise.
 *
 * @example
 *
 * ```ts
 * import {UnwrapMethodsReturnType} from "helper/type"
 *
 * class Page<T> {
 *   hasNext(): boolean { }
 *
 *   list(): Promise<T> { }
 * }
 *
 * UnwrapMethodsReturnType<Page<User>> // -> {hasNext: boolean, list: User[]}
 * ```
 */
export type UnwrapMethodsReturnType<T extends object> = {
  [key in keyof T]: T[key] extends (...args: any[]) => any
    ? UnwrapPromise<ReturnType<T[key]>>
    : T[key]
}

export default UnwrapMethodsReturnType
