import {z} from "zod"

import {FileInput} from "../common/FileInput.js"

import {UserBase} from "./UserBase.js"

export const UserUpdateInput = UserBase.extend({
  avatar: FileInput.nullish()
})

export type IUserUpdateInput = z.input<typeof UserUpdateInput>

export type OUserUpdateInput = z.output<typeof UserUpdateInput>
