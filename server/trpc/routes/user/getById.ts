import {wrap} from "@typeschema/valibot"

import {procedure} from "../../procedures/base.js"
import {notFound} from "../../errors/notFound.js"

import {User} from "../../../db/entities/User.js"

import {Node} from "../../types/common/Node.js"
import {UserOutput} from "../../types/user/UserOutput.js"

export const getById = procedure
  .input(wrap(Node))
  .output(wrap(UserOutput))
  .query(async ({input: {id}, ctx: {orm}}) => orm.em.findOneOrFail(User, id, {
    failHandler: () => notFound("User not found")
  }))
