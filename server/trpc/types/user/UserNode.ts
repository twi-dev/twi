import type {Input, Output} from "valibot"
import {merge} from "valibot"

import {Node} from "../common/Node.js"

import {UserBase} from "./UserBase.js"

export const UserNode = merge([Node, UserBase])

export type IUserNode = Input<typeof UserNode>

export type OUserNode = Output<typeof UserNode>
