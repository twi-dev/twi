import type {Input, Output} from "valibot"
import {string, uuid} from "valibot"

export const ID = string([uuid()])

export type IID = Input<typeof ID>

export type OID = Output<typeof ID>
