import type {Input, Output} from "valibot"
import {string, minLength} from "valibot"

export const FileInput = string([minLength(1)])

export type IFileInput = Input<typeof FileInput>

export type OFileInput = Output<typeof FileInput>
