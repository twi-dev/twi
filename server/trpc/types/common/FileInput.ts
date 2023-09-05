import {z} from "zod"

export const FileInput = z.string()

export type IFileInput = z.input<typeof FileInput>

export type OFileInput = z.output<typeof FileInput>
