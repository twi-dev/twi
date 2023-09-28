/* eslint-disable indent */

export const DEFAULT_COOKIE_PREFIX = "twi"

export type CookieName<
  TName extends string,
  TPrefix extends string = typeof DEFAULT_COOKIE_PREFIX
> = `${TPrefix}.${TName}`

export const createCookieName = <
  TName extends string,
  TPrefix extends string = typeof DEFAULT_COOKIE_PREFIX
>(
  name: TName,
  prefix?: TPrefix
) => `${prefix ?? DEFAULT_COOKIE_PREFIX}.${name}` as CookieName<TName, TPrefix>
