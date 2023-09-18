/* eslint-disable indent */

import {customAlphabet, urlAlphabet} from "nanoid"

export const DEFAULT_SUFFIX_SIZE = 5

export const DEFAULT_SUFFIX_SEPARATOR = "~"

export const RANDOM_SUFFIX_PATTERN = /^[a-z0-9]+$/i

const alphabet = urlAlphabet.replace(/[^a-z0-9]/gi, "") // Strip all non alpha-numeric characters

const nanoid = customAlphabet(alphabet, DEFAULT_SUFFIX_SIZE)

export type RandomSuffix<
  TSeparator extends string = typeof DEFAULT_SUFFIX_SEPARATOR
> = `${TSeparator}${string}`

export const isRandomSuffixValid = <
  TSize extends number = typeof DEFAULT_SUFFIX_SIZE
>(
  value: string,
  size?: TSize
): boolean => value.length === (size ?? DEFAULT_SUFFIX_SIZE)
  && RANDOM_SUFFIX_PATTERN.test(value)

export const createRandomSuffix = <
  TSeparator extends string = typeof DEFAULT_SUFFIX_SEPARATOR,
  TSize extends number = typeof DEFAULT_SUFFIX_SIZE
>(
  size?: TSize,
  separator?: TSeparator
) => (
  `${separator || DEFAULT_SUFFIX_SEPARATOR}${nanoid(size)}`
) as RandomSuffix<TSeparator>
