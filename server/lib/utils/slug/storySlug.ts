import {
  createRandomSuffix,
  isRandomSuffixValid,
  DEFAULT_SUFFIX_SIZE,
  DEFAULT_SUFFIX_SEPARATOR
} from "./createRandomSuffix.js"
import type {RandomSuffix} from "./createRandomSuffix.js"
import {createSlug, isSlugValid} from "./createSlug.js"

export const SLUG_DATE_FORMAT = "yyyy-MM-dd"

export const SLUG_NAME_VALID_REGEXPR = /^[a-z0-9-]+~[a-zA-Z0-9]{5}$/

export const SUFFIX_LENGTH = 5

export const SLUG_BASE_LENGTH = DEFAULT_SUFFIX_SIZE
  + DEFAULT_SUFFIX_SEPARATOR.length

export type StorySlug = `${string}${RandomSuffix}`

/**
 * Checks if given `value` is valid story slug suffix
 *
 * @param value A valut to test
 *
 * ```ts
 * import {isStorySlugSuffixValid} from "~server/lib/utils/slug/storySlug.js"
 *
 * isStorySlugSuffixValid("3u0tf") // -> true
 *
 * isStorySlugSuffixValid('abc-_dfsf~hja") // false
 * ```
 */
export const isStorySlugSuffixValid = (
  value: string
) => isRandomSuffixValid(value)

/**
 * Checks if slug `name` has valid format.
 *
 * The `name` argument **must** include `suffix`.
 *
 * Valid format matches `SLUG_NAME_VALID_REGEXPR` regexp.
 *
 * @param name
 *
 * @example
 *
 * ```ts
 * import {isStorySlugNameValid} from "~server/lib/utils/slug/storySlug.js"
 *
 * isStorySlugNameValid("hello-world") // -> true
 *
 * isStorySLugNameValid("hello-word~3u0tf") // -> false
 * ```
 */
export const isStorySlugNameValid = (name: string) => isSlugValid(name)

/**
 * Formats slug `name` part
 *
 * @param name a value to slugify
 *
 * @example
 *
 * ```ts
 * import {formatStorySlugName} from "~server/lib/utils/slug/storySlug.js"
 *
 * formatStorySlugName("Hello world!") // -> "hello-world"
 *
 * formatStorySlugname("Привет, Мир!") // -> "privet-mir"
 * ```
 */
export const formatStorySlugName = (name: string) => createSlug(name.trim())

/**
 * Checks is given `value` is a valid story slug
 *
 * @param value A value to test
 */
export function isStorySlugValid(
  value: string
): value is StorySlug {
  const [name, suffix] = value.split(DEFAULT_SUFFIX_SEPARATOR)

  return isStorySlugNameValid(name)
    && !!suffix
    && isStorySlugSuffixValid(suffix)
    && value.length >= SLUG_BASE_LENGTH
}

/**
 * Formats slug from given `name` and `date`.
 *
 * ```ts
 * import {formatSlug} from "server/lib/util/slug"
 *
 * formatSlug("hello-world")
 * // -> hello-world~3u0tf
 * ```
 */
export const formatStorySlug = (
  name: string
): StorySlug => `${formatStorySlugName(name)}${createRandomSuffix()}`
