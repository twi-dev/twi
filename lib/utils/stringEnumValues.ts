/* eslint-disable indent */

import {isString} from "lodash-es"

export const stringEnumValues = <
  TEnumKey extends string,
  TEnumValue extends string
>(
  enumValue: Record<TEnumKey, TEnumValue>
): Array<`${TEnumValue}`> => Object
  .values(enumValue)
  .filter(value => isString(value)) as Array<`${TEnumValue}`>
