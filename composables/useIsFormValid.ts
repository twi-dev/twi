import type {FormErrors} from "@vorms/core"
import {isEmpty} from "lodash-es"

import type {ComputedRef} from "#imports"
import {computed, unref} from "#imports"

interface UseIsFormVaidResult {
  /**
   * Returns `true` if `errors` object has no errors
   */
  isValid: ComputedRef<boolean>

  /**
   * Returns `true` if `errors` object has any errors
   */
  isInvalid: ComputedRef<boolean>
}

/**
 * Checks if vorms `errors` object has any errors
 *
 * @param errors vorms errors ref
 */
export function useIsFormVaid<TValues>(
  errors: ComputedRef<FormErrors<TValues>>
): UseIsFormVaidResult {
  const isValid = computed(() => isEmpty(unref(errors)))

  const isInvalid = computed(() => unref(isValid) === false)

  return {isValid, isInvalid}
}
