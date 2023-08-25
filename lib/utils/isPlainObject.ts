import {isPlainObject as isPOJO} from "lodash-es"

/**
 * Better typed `_.isPlainObject`
 *
 * @param value
 */
export const isPlainObject = (
  value: unknown
): value is Record<PropertyKey, unknown> => isPOJO(value)
