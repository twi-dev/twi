import {z} from "zod"

import {FileInput} from "../common/FileInput.js"

import {User} from "./User.js"

export const UserUpdateInput = User
  .omit({
    login: true
  })
  .extend({
    avatar: FileInput.nullish()
  })

export type IUserUpdateInput = z.input<typeof UserUpdateInput>

export type OUserUpdateInput = z.output<typeof UserUpdateInput>
