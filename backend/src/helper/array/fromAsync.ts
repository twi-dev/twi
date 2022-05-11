import {MaybePromise} from "helper/type/MaybePromise"

interface MapFunction<T, U> {
  (value: T, index: number): MaybePromise<U>
}

Array.from([])

// eslint-disable-next-line no-undef
async function arrayFromAsync<T>(iterable: AsyncIterable<T>): Promise<T[]>
async function arrayFromAsync<T, U>(
  // eslint-disable-next-line no-undef
  iterable: AsyncIterable<T>,
  mapFn: MapFunction<T, U>
): Promise<U[]>
async function arrayFromAsync<T, U>(
  // eslint-disable-next-line no-undef
  iterable: AsyncIterable<T>,
  mapFn?: MapFunction<T, U>,
  ctx?: unknown
): Promise<U[]> {
  const array = new Array(0)

  for await (const value of iterable) {
    if (array.length >= Number.MAX_SAFE_INTEGER) {
      throw new TypeError(
        "Input is too long and exceeded Number.MAX_SAFE_INTEGER times."
      )
    }

    array.push(mapFn ? await mapFn.call(ctx, value, array.length - 1) : value)
  }

  return array
}

export default arrayFromAsync
