import {procedure} from "../../procedures/base.js"

import {User} from "../../../db/entities/User.js"

import {UserOutput} from "../../types/user/UserOutput.js"
import {UserSignUpInput} from "../../types/user/UserSignUpInput.js"

export const create = procedure
  .input(UserSignUpInput)
  .output(UserOutput)
  .mutation(async ({input, ctx: {orm}}) => {
    const user = orm.em.create(User, input)

    await orm.em.persistAndFlush(user)

    return user
  })
