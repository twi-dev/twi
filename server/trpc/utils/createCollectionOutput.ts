/* eslint-disable indent */

import {transform, instance, array, parse} from "valibot"
import type {ObjectSchema, ObjectShape} from "valibot"
import {Collection} from "@mikro-orm/core"

// NOTE: This might need some improvements
export const createCollectionOutput = <T extends ObjectShape>(
  schema: ObjectSchema<T>
) => transform(
  instance(Collection),

  value => parse(array(schema), value.toArray())
)
