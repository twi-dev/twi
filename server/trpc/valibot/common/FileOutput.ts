import type {Input, Output} from "valibot"
import {merge, object} from "valibot"

import {Record} from "./Record.js"
import {FileInput} from "./FileInput.js"

export const FileOutput = merge([
  Record,

  object({
    key: FileInput
  })
])

export type IFileOutput = Input<typeof FileOutput>

export type OFileOutput = Output<typeof FileOutput>
