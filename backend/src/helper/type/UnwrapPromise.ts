/**
 * Unwraps type of value that the Promise is resolving
 */
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T

export default UnwrapPromise
