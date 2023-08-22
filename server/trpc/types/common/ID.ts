import {type Input, type Output, string, minLength} from "valibot"

export const ID = string([minLength(1)])

export type IID = Input<typeof ID>

export type OID = Output<typeof ID>
