/* eslint-disable indent */

import {transform, instance, array, parse} from "valibot"
import type {ObjectSchema, ObjectEntries} from "valibot"
import {Collection} from "@mikro-orm/core"

// NOTE: This might need some improvements
export const createCollectionOutput = <T extends ObjectEntries>(
  schema: ObjectSchema<T>
) => transform(
  instance(Collection),

  value => parse(array(schema), value.toArray())
)
