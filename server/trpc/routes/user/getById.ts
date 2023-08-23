import {TRPCError} from "@trpc/server"

import {procedure} from "../../procedures/base.js"

import {User} from "../../../db/entity/User.js"

import {Node} from "../../types/common/Node.js"
import {UserOutput} from "../../types/user/UserOutput.js"

export const getById = procedure
  .input(Node)
  .output(UserOutput)
  .query(async ({input: {id}, ctx: {orm}}) => orm.em.findOneOrFail(User, id, {
    failHandler: () => new TRPCError({code: "NOT_FOUND"})
  }))
