import type {MergeUnions} from "../../../../lib/utils/types/MergeUnions.js"

export type MergeOptionals<
  TLeft extends string = never,
  TRight extends string = never
> = MergeUnions<TLeft, TRight>
