import {wrap} from "@decs/typeschema"

import {procedure} from "../../procedures/base.js"

import {User} from "../../../db/entities/User.js"

import {UserOutput} from "../../valibot/user/UserOutput.js"
import {UserSignUpInput} from "../../valibot/user/UserSignUpInput.js"

export const create = procedure
  .input(wrap(UserSignUpInput))
  .output(wrap(UserOutput))
  .mutation(async ({input, ctx: {orm}}) => {
    const user = orm.em.create(User, input)

    await orm.em.persistAndFlush(user)

    return user
  })
