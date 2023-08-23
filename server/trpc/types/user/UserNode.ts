import {z} from "zod"

import {Node} from "../common/Node.js"

import {UserBase} from "./UserBase.js"

export const UserNode = Node.merge(UserBase)

export type IUserNode = z.input<typeof UserNode>

export type OUserNode = z.output<typeof UserNode>
