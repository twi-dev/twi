import {MaybePromise} from "helper/type/MaybePromise"

interface MapFunction<T, U> {
  (value: T, index: number): MaybePromise<U>
}

/**
 * Creates an array from AsyncIterable source
 */
async function arrayFromAsync<T>(source: AsyncIterable<T>): Promise<T[]>
async function arrayFromAsync<T, U>(
  source: AsyncIterable<T>,
  mapFn: MapFunction<T, U>
): Promise<U[]>
async function arrayFromAsync<T, U>(
  source: AsyncIterable<T>,
  mapFn?: MapFunction<T, U>,
  ctx?: unknown
): Promise<U[]> {
  const array = new Array(0)

  for await (const value of source) {
    if (array.length >= Number.MAX_SAFE_INTEGER) {
      throw new TypeError(
        "Input is too long and exceeded Number.MAX_SAFE_INTEGER times."
      )
    }

    array.push(mapFn ? await mapFn.call(ctx, value, array.length) : value)
  }

  return array
}

export default arrayFromAsync
