import type {CookieOption} from "next-auth"

import type {Replace} from "../../../lib/utils/types/Replace.js"
import {serverAddress} from "../../../lib/utils/serverAddress.js"

import {createCookieName, type CookieName} from "./createCookieName.js"

type CreateCookieOptionResult<TName extends string> = Replace<CookieOption, {
  name: CookieName<TName>
}>

export const createCookieOption = <TName extends string>(
  name: TName
): CreateCookieOptionResult<TName> => ({
  name: createCookieName(name),
  options: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: new URL(serverAddress).protocol === "https:"
  }
})
