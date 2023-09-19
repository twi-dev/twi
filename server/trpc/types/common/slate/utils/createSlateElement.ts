/* eslint-disable indent */

import type {ZodObject, ZodTypeAny} from "zod"
import {z} from "zod"

import {WithId} from "../WithId.js"

type SlateElementShapeBase = {
  children: ZodTypeAny
}

interface CreateSlateElementParams<
  TType extends string,
  TShape extends SlateElementShapeBase
> {
  type: TType
  shape: ZodObject<TShape>
}

export const createSlateElement = <
  TType extends string,
  TShape extends SlateElementShapeBase
>(
  params: CreateSlateElementParams<TType, TShape>
) => params.shape.merge(WithId).extend({type: z.literal(params.type)})
