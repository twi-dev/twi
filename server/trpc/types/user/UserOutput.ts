import type {Input, Output} from "valibot"
import {object, nullable} from "valibot"

import {ImageOutput} from "../common/ImageOutput.js"

import {UserDisplayName} from "./UserDisplayName.js"
import {UserRecord} from "./UserRecord.js"

export const UserOutput = object({
  ...UserRecord.object,

  displayName: nullable(UserDisplayName),
  avatar: nullable(ImageOutput)
})

export type IUserOutput = Input<typeof UserOutput>

export type OUserOutput = Output<typeof UserOutput>
