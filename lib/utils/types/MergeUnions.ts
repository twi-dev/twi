/**
 * Merges two uion types together
 */
export type MergeUnions<TLeft = never, TRight = never> =
  [TLeft] extends [never]
    ? [TRight] extends [never]
      ? never
      : TRight
    : [TRight] extends [never]
      ? TLeft
      : TLeft | TRight
