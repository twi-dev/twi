import {z} from "zod"

import {Record} from "./Record.js"
import {FileInput} from "./FileInput.js"

export const FileOutput = Record.extend({
  key: FileInput
})

export type IFileOutput = z.input<typeof FileOutput>

export type OFileOutput = z.output<typeof FileOutput>
